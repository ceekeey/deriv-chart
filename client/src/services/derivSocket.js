const DEFAULT_APP_ID = Number(import.meta.env.VITE_DERIV_APP_ID || 1089);
// Official Deriv streaming endpoint (use environment override if provided)
const DEFAULT_WS_URL =
  import.meta.env.VITE_DERIV_WS_URL || "wss://ws.binaryws.com/websockets/v3";

export const TIMEFRAME_OPTIONS = [
  { label: "1m", value: "1m", granularity: 60 },
  { label: "5m", value: "5m", granularity: 300 },
  { label: "15m", value: "15m", granularity: 900 },
  { label: "30m", value: "30m", granularity: 1800 },
  { label: "1H", value: "1H", granularity: 3600 },
  { label: "4H", value: "4H", granularity: 14400 },
  { label: "1D", value: "1D", granularity: 86400 },
];

export const getDerivGranularity = (timeframe) => {
  const match = TIMEFRAME_OPTIONS.find((item) => item.value === timeframe);
  return match ? match.granularity : 60;
};

export const normalizeDerivCandle = (rawCandle) => {
  if (!rawCandle || typeof rawCandle !== "object") {
    return null;
  }

  const numericTime = Number(
    rawCandle.epoch ??
      rawCandle.time ??
      rawCandle.timestamp ??
      rawCandle.date ??
      rawCandle.start ??
      rawCandle.open_time,
  );
  const open = Number(rawCandle.open ?? rawCandle.o ?? 0);
  const high = Number(rawCandle.high ?? rawCandle.h ?? 0);
  const low = Number(rawCandle.low ?? rawCandle.l ?? 0);
  const close = Number(rawCandle.close ?? rawCandle.c ?? 0);

  if (
    !Number.isFinite(numericTime) ||
    !Number.isFinite(open) ||
    !Number.isFinite(high) ||
    !Number.isFinite(low) ||
    !Number.isFinite(close)
  ) {
    return null;
  }

  const time =
    numericTime > 1_000_000_000_000
      ? Math.floor(numericTime / 1000)
      : Math.floor(numericTime);

  return {
    time,
    open,
    high,
    low,
    close,
  };
};

const socketState = {
  socket: null,
  reconnectTimer: null,
  isConnected: false,
  isIntentionalDisconnect: false,
  connectionAttempt: 0,
  requestHandlers: new Map(), // maps req_id -> { handler, persistent }
  pendingRequests: [],
  subscriptions: new Map(), // maps local req_id -> deriv subscription id
};

const parseMessage = (payload) => {
  if (!payload) {
    return null;
  }

  try {
    return typeof payload === "string" ? JSON.parse(payload) : payload;
  } catch (error) {
    console.error("Failed to parse Deriv message:", error);
    return null;
  }
};

const getSocketUrl = () => `${DEFAULT_WS_URL}?app_id=${DEFAULT_APP_ID}`;

const flushPendingRequests = () => {
  if (
    !socketState.socket ||
    socketState.socket.readyState !== WebSocket.OPEN ||
    !socketState.pendingRequests.length
  ) {
    return;
  }

  const queuedRequests = [...socketState.pendingRequests];
  socketState.pendingRequests = [];

  queuedRequests.forEach(({ requestId, payload, onError }) => {
    try {
      socketState.socket.send(
        JSON.stringify({ ...payload, req_id: requestId }),
      );
    } catch (error) {
      onError?.(error);
    }
  });
};

const handleIncomingMessage = (event) => {
  const message = parseMessage(event.data);

  if (!message) {
    return;
  }

  const requestId = message.req_id || message.echo_req?.req_id;

  if (requestId && socketState.requestHandlers.has(requestId)) {
    const entry = socketState.requestHandlers.get(requestId);
    const { handler, persistent } = entry || {};

    // If the server provided a subscription id, track it
    const subscriptionObj =
      message.subscription ?? message.subscription_id ?? null;
    let subscriptionId = null;
    if (subscriptionObj) {
      subscriptionId =
        typeof subscriptionObj === "object"
          ? (subscriptionObj.id ?? subscriptionObj)
          : subscriptionObj;
      if (subscriptionId) {
        socketState.subscriptions.set(requestId, subscriptionId);
      }
    }

    try {
      handler?.(message);
    } catch (err) {
      console.error("Deriv handler error:", err);
    }

    // Remove handler only for one-time requests
    if (!persistent) {
      socketState.requestHandlers.delete(requestId);
    }

    return;
  }

  if (message.error) {
    console.error("Deriv WebSocket error:", message.error);
  }
};

const openSocket = () => {
  if (typeof window === "undefined") {
    return null;
  }

  if (
    socketState.socket &&
    (socketState.socket.readyState === WebSocket.OPEN ||
      socketState.socket.readyState === WebSocket.CONNECTING)
  ) {
    return socketState.socket;
  }

  socketState.isIntentionalDisconnect = false;
  const socket = new WebSocket(getSocketUrl());
  socketState.socket = socket;

  socket.addEventListener("open", () => {
    socketState.isConnected = true;
    socketState.connectionAttempt = 0;
    // clear any pending reconnect timer
    if (socketState.reconnectTimer) {
      window.clearTimeout(socketState.reconnectTimer);
      socketState.reconnectTimer = null;
    }
    flushPendingRequests();
  });

  socket.addEventListener("close", () => {
    socketState.isConnected = false;

    if (socketState.isIntentionalDisconnect) {
      return;
    }

    socketState.connectionAttempt += 1;
    const delay = Math.min(2000 + socketState.connectionAttempt * 500, 8000);

    if (socketState.reconnectTimer) {
      window.clearTimeout(socketState.reconnectTimer);
      socketState.reconnectTimer = null;
    }

    socketState.reconnectTimer = window.setTimeout(() => {
      // only attempt reconnect if there's no active socket
      if (
        !socketState.socket ||
        (socketState.socket &&
          socketState.socket.readyState !== WebSocket.OPEN &&
          socketState.socket.readyState !== WebSocket.CONNECTING)
      ) {
        openSocket();
      }
    }, delay);
  });

  socket.addEventListener("error", () => {
    socketState.isConnected = false;
  });

  socket.addEventListener("message", handleIncomingMessage);

  return socket;
};

const sendRequest = ({ requestId, payload, onSuccess, onError }) => {
  const socket = openSocket();

  if (!socket) {
    onError?.(new Error("WebSocket is unavailable in this environment."));
    return null;
  }

  const normalizedRequestId =
    requestId || `req-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  const isPersistent = Boolean(payload && payload.subscribe);

  socketState.requestHandlers.set(normalizedRequestId, {
    handler: (message) => {
      if (message.error) {
        onError?.(message.error);
        return;
      }

      onSuccess?.(message);
    },
    persistent: isPersistent,
  });

  const requestPayload = { ...payload, req_id: normalizedRequestId };

  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(requestPayload));
    return normalizedRequestId;
  }

  if (socket.readyState === WebSocket.CONNECTING) {
    socketState.pendingRequests.push({
      requestId: normalizedRequestId,
      payload: requestPayload,
      onError,
    });
    return normalizedRequestId;
  }

  onError?.(new Error("WebSocket is not ready to send requests."));
  return null;
};

export const derivSocket = {
  connect: () => openSocket(),

  disconnect: () => {
    socketState.isIntentionalDisconnect = true;
    socketState.pendingRequests = [];

    if (socketState.reconnectTimer) {
      window.clearTimeout(socketState.reconnectTimer);
      socketState.reconnectTimer = null;
    }

    if (socketState.socket) {
      socketState.socket.close();
      socketState.socket = null;
    }

    socketState.isConnected = false;
  },

  isConnected: () => socketState.isConnected,

  requestHistoricalCandles: ({
    symbol,
    timeframe,
    count = 200,
    reqId,
    onSuccess,
    onError,
  }) => {
    const granularity = getDerivGranularity(timeframe);
    const normalizedSymbol = symbol || "R_100";

    return sendRequest({
      requestId: reqId || `history-${Date.now()}`,
      payload: {
        ticks_history: normalizedSymbol,
        style: "candles",
        granularity,
        count,
      },
      onSuccess,
      onError,
    });
  },

  subscribeToCandles: ({ symbol, timeframe, reqId, onSuccess, onError }) => {
    const granularity = getDerivGranularity(timeframe);
    const normalizedSymbol = symbol || "R_100";

    return sendRequest({
      requestId: reqId || `live-${Date.now()}`,
      payload: {
        ticks_history: normalizedSymbol,
        style: "candles",
        granularity,
        subscribe: 1,
      },
      onSuccess,
      onError,
    });
  },

  unsubscribeFromCandles: ({ reqId, subscriptionId } = {}) => {
    if (!reqId && !subscriptionId) {
      return;
    }

    // Remove local handler for this request id if present
    if (reqId) {
      socketState.requestHandlers.delete(reqId);
    }

    const subId =
      subscriptionId || (reqId ? socketState.subscriptions.get(reqId) : null);

    if (
      subId &&
      socketState.socket &&
      socketState.socket.readyState === WebSocket.OPEN
    ) {
      // Deriv/BinaryWS uses "forget" to cancel a subscription id
      socketState.socket.send(JSON.stringify({ forget: subId, req_id: reqId }));
      if (reqId) {
        socketState.subscriptions.delete(reqId);
      }
      return;
    }

    // Fallback: attempt to send the previous unsubscribe-style payload for compatibility
    if (
      reqId &&
      socketState.socket &&
      socketState.socket.readyState === WebSocket.OPEN
    ) {
      socketState.socket.send(
        JSON.stringify({ ticks_history: null, unsubscribe: 1, req_id: reqId }),
      );
    }
  },
};

export default derivSocket;
