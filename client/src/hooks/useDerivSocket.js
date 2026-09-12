import { useCallback, useMemo, useState } from "react";
import derivSocket from "../services/derivSocket";

export function useDerivSocket() {
  const [isConnected, setIsConnected] = useState(derivSocket.isConnected());

  const connect = useCallback(() => {
    derivSocket.connect();
    setIsConnected(derivSocket.isConnected());
  }, []);

  const disconnect = useCallback(() => {
    derivSocket.disconnect();
    setIsConnected(false);
  }, []);

  return useMemo(
    () => ({
      isConnected,
      connect,
      disconnect,
    }),
    [connect, disconnect, isConnected],
  );
}
