# Milestone 5 — Trading Chart

## Objective

Implement the first functional trading chart for the Chart application.

This milestone must create a professional candlestick chart using Lightweight Charts and connect it to the Deriv WebSocket API for:

- Historical candle data
- Live candle updates
- Timeframe switching
- WebSocket connection management

At the end of this milestone, an authenticated user should be able to open the chart area, view historical candlesticks, and see the current candle update in real time.

This milestone is focused on market data visualization.

Do not implement trade execution.

---

# Core User Flow

The expected flow is:

```text
Authenticated User
        ↓
Open Dashboard / Chart Page
        ↓
Chart Component Loads
        ↓
Connect to Deriv WebSocket
        ↓
Request Historical Candles
        ↓
Render Candlestick Series
        ↓
Subscribe to Live Candle Updates
        ↓
Current Candle Updates in Real Time
        ↓
User Changes Timeframe
        ↓
Old Data Cleared
        ↓
New Historical Data Loaded
        ↓
New Live Subscription Active
```

---

# Required Technology

Use the existing project architecture and dependencies where possible.

Expected frontend technology:

```text
React
Vite
Tailwind CSS v4
React Router
Axios
Zustand
```

Add:

```text
lightweight-charts
```

Use the official Lightweight Charts library.

Do not replace it with:

```text
TradingView widget
iframe charts
Chart.js
Recharts
ApexCharts
```

The goal is to build the application's own interactive market chart component.

---

# Important Instructions

Before writing code:

1. Inspect the existing repository.
2. Inspect Milestone 4 frontend architecture.
3. Inspect the authentication system.
4. Inspect the Dashboard implementation.
5. Inspect the existing Tailwind CSS v4 theme.
6. Preserve the established Chart application color scheme.
7. Inspect whether a chart component or Deriv service already exists.
8. Avoid creating duplicate services or duplicate WebSocket connections.
9. Do not break authentication.
10. Do not break existing routes.
11. Do not implement trading execution.
12. Do not hardcode secrets.
13. Use environment variables for configurable Deriv API settings where appropriate.
14. Test the complete chart flow before declaring the milestone complete.

---

# Official Application Color Scheme

The chart UI must continue using the existing Chart design system.

```text
Background       #0B1220
Surface          #111827
Panel            #172033
Border           #263248

Primary Blue     #3B82F6
Primary Hover    #60A5FA

Buy / Success    #22C55E
Sell / Danger    #EF4444
Warning          #F59E0B

Text Primary     #F8FAFC
Text Secondary   #94A3B8
```

Use semantic Tailwind tokens created during Milestone 4.

Do not scatter raw colors across components.

The chart itself should visually integrate with the application.

---

# Step 1 — Inspect Existing Application Architecture

Before implementation, inspect:

```text
Frontend package.json
Existing routes
Dashboard page
Authentication store
Existing API services
Tailwind theme
Environment configuration
```

Determine:

- Where reusable components belong
- Whether the Dashboard should contain the chart
- Whether a dedicated chart route already exists
- Whether a market data service exists

Do not restructure the application unnecessarily.

---

# Step 2 — Install Lightweight Charts

Install the official library if it is not already installed:

```text
lightweight-charts
```

Verify the installed version is compatible with the project's React environment.

Do not install multiple charting libraries.

After installation:

```text
[ ] Application still starts
[ ] Production build still works
[ ] No dependency conflicts
```

---

# Step 3 — Create Chart Component Architecture

Do not put all chart logic inside one massive React component.

Recommended conceptual structure:

```text
src/
├── components/
│   └── chart/
│       ├── TradingChart.jsx
│       ├── ChartToolbar.jsx
│       └── TimeframeSelector.jsx
│
├── services/
│   └── deriv/
│       └── derivWebSocket.js
│
├── hooks/
│   └── useMarketData.js
│
└── ...
```

This exact structure is only a recommendation.

Adapt to the existing project architecture.

The important separation is:

```text
UI Components
     ↓
React Hook / State
     ↓
Market Data Service
     ↓
Deriv WebSocket
```

The Lightweight Charts component should not contain unnecessary low-level WebSocket protocol logic.

---

# Step 4 — Create Lightweight Charts Component

Create the primary chart component.

Recommended name:

```text
TradingChart
```

The component should:

```text
[ ] Create the chart
[ ] Create a candlestick series
[ ] Load candle data
[ ] Update candle data
[ ] Handle resizing
[ ] Destroy chart correctly
[ ] Clean up subscriptions
```

Use React refs for:

```text
Chart container
Chart instance
Candlestick series
```

Avoid storing the chart instance in React state.

Recommended conceptual structure:

```text
TradingChart
│
├── containerRef
│
├── chartRef
│
└── candlestickSeriesRef
```

---

# Step 5 — Chart Initialization

Initialize the Lightweight Chart only after the chart container is available.

The chart should use:

```text
Background: application background/surface
Text: primary/secondary application text
Grid lines: subtle border color
Crosshair: visible but professional
```

Recommended visual direction:

```text
Dark trading terminal
Subtle grid
Readable candles
Minimal distractions
Professional spacing
```

Do not use:

```text
Heavy gradients
Bright neon grids
Excessive glow
Animated backgrounds
```

---

# Step 6 — Candlestick Series

Create a candlestick series.

Each candle should contain:

```text
time
open
high
low
close
```

The data format must be compatible with Lightweight Charts.

Example conceptual data:

```js
{
  time: 1710000000,
  open: 1.082,
  high: 1.085,
  low: 1.080,
  close: 1.084
}
```

Ensure time formatting is handled correctly.

Do not pass invalid timestamps.

Do not mix milliseconds and seconds.

Verify the Deriv data format and normalize it before passing it to Lightweight Charts.

---

# Step 7 — Candle Colors

Use the application's trading semantics.

Recommended:

```text
Bullish Candle → #22C55E
Bearish Candle → #EF4444
```

Do not introduce unrelated colors.

Ensure wick and border colors are visually consistent with candle direction.

The goal is immediate trading readability.

---

# Step 8 — Responsive Chart Container

The chart must resize correctly.

The chart should:

```text
Fill available container space
Respond to window/container resizing
Avoid overflow
Avoid fixed desktop-only dimensions
Work on tablet
Work on mobile
```

Use a resize strategy compatible with Lightweight Charts.

Prefer a `ResizeObserver` where appropriate instead of relying only on global window resize events.

On component cleanup:

```text
[ ] Disconnect ResizeObserver
[ ] Remove chart
[ ] Clear references
```

Do not leave orphaned chart instances.

---

# Step 9 — Deriv WebSocket Architecture

Create a dedicated Deriv WebSocket service.

Do not create WebSocket instances directly inside multiple UI components.

Conceptually:

```text
Deriv WebSocket Service
        │
        ├── connect()
        ├── disconnect()
        ├── requestHistoricalCandles()
        ├── subscribeToCandles()
        └── unsubscribe()
```

The exact implementation can follow the Deriv WebSocket API requirements.

The service should manage:

```text
Connection
Messages
Requests
Subscriptions
Errors
Cleanup
```

---

# Step 10 — Environment Configuration

Use environment variables for configurable Deriv settings.

Do not hardcode application identifiers or configuration values throughout components.

Use appropriate variables such as:

```text
VITE_DERIV_APP_ID
VITE_DERIV_WS_URL
```

Use the exact configuration required by the current Deriv WebSocket API.

If `.env.example` exists, update it.

Do not commit secrets.

If an application ID is required for the public WebSocket endpoint, document it clearly.

---

# Step 11 — WebSocket Connection Lifecycle

The expected connection lifecycle:

```text
Chart Component Needs Data
        ↓
Connect WebSocket
        ↓
Connection Open
        ↓
Request Historical Candles
        ↓
Receive Historical Data
        ↓
Render Chart
        ↓
Subscribe to Live Updates
        ↓
Receive Live Updates
```

On cleanup:

```text
Component Unmount
        ↓
Unsubscribe
        ↓
Remove message listeners
        ↓
Close connection when appropriate
```

Avoid:

```text
Multiple duplicate WebSocket connections
Duplicate event listeners
Duplicate subscriptions
Zombie connections
```

---

# Step 12 — Historical Candles

Implement historical candle loading.

The application must request enough historical candle data to create a useful chart.

The request should include the current:

```text
Symbol
Timeframe / Granularity
Candle count or date range
```

The flow:

```text
Selected Symbol
        +
Selected Timeframe
        ↓
Request Historical Candles
        ↓
Normalize Data
        ↓
Sort by Time
        ↓
Remove duplicates
        ↓
setData()
        ↓
fitContent()
```

Historical data should be loaded before live streaming is applied.

Do not repeatedly call `setData()` for every live tick.

---

# Step 13 — Historical Data Normalization

Create a clear normalization layer.

Deriv data should be transformed into the exact structure required by Lightweight Charts.

Concept:

```text
Deriv Candle
        ↓
Normalization
        ↓
{
  time,
  open,
  high,
  low,
  close
}
        ↓
Lightweight Charts
```

Verify:

```text
[ ] Timestamps are correct
[ ] Time is chronological
[ ] No duplicates
[ ] OHLC values are numeric
[ ] No invalid candles are passed
```

Do not assume the incoming API structure without inspecting the actual response.

---

# Step 14 — Live Candle Updates

After historical candles load successfully, subscribe to live updates.

The live update flow:

```text
Live Deriv Message
        ↓
Normalize Candle
        ↓
Determine Candle Time
        ↓
series.update()
```

The current candle should update in real time.

When a new candle begins, Lightweight Charts should receive the new candle naturally through `series.update()`.

Avoid:

```text
Reloading all historical data
Calling setData() on every tick
Destroying/recreating the chart
```

Use efficient incremental updates.

---

# Step 15 — Live Update Validation

Before updating the chart:

```text
[ ] Validate message type
[ ] Validate symbol
[ ] Validate OHLC values
[ ] Normalize timestamp
[ ] Ignore irrelevant WebSocket messages
```

The WebSocket service may receive messages unrelated to the active chart.

Do not blindly pass every message to the candlestick series.

---

# Step 16 — Timeframe System

Create timeframe switching.

Initial supported timeframes should be chosen based on Deriv-supported granularities and verified against the API.

Do not invent unsupported API values.

Recommended UI timeframes may include:

```text
1m
5m
15m
30m
1H
4H
1D
```

The exact mapping should separate:

```text
Display Label
        ↓
API Granularity
```

Example conceptual mapping:

```text
1m  → API granularity
5m  → API granularity
15m → API granularity
```

Keep this mapping centralized.

Do not scatter timeframe conversion logic across components.

---

# Step 17 — Timeframe Switching Flow

When the user changes timeframe:

```text
User Selects New Timeframe
        ↓
Update Active Timeframe
        ↓
Stop Old Live Subscription
        ↓
Ignore Stale Responses
        ↓
Request New Historical Data
        ↓
Replace Chart Data
        ↓
Subscribe to New Live Updates
```

Critical requirement:

Do not allow old timeframe WebSocket updates to continue updating the chart.

Use request/subscription tracking to prevent stale messages from modifying the current chart.

---

# Step 18 — Timeframe Selector UI

Create a clean timeframe selector.

Recommended layout:

```text
1m   5m   15m   30m   1H   4H   1D
```

Visual behavior:

```text
Inactive → subtle text/background
Active   → primary blue
Hover    → primary hover styling
```

Use the established color scheme.

The selector must remain usable on small screens.

Do not create an oversized component.

---

# Step 19 — Chart Loading State

While historical data is loading:

```text
[ ] Show chart loading state
[ ] Prevent misleading empty chart state
[ ] Avoid flickering
```

Recommended message:

```text
Loading market data...
```

Use subtle loading visuals.

Do not block the entire application unnecessarily.

---

# Step 20 — Chart Error State

Handle:

```text
WebSocket connection failure
Historical request failure
Invalid market symbol
Invalid timeframe
Unexpected API response
Connection closed unexpectedly
Network failure
```

Display a useful chart-level error.

Do not crash the entire React application.

Example:

```text
Unable to load market data.

Retry
```

Implement a retry approach appropriate for the architecture.

Do not create infinite rapid reconnect loops.

---

# Step 21 — WebSocket Reconnection

Implement reasonable reconnection behavior.

Requirements:

```text
[ ] Detect unexpected connection close
[ ] Avoid duplicate reconnect attempts
[ ] Use controlled retry
[ ] Avoid rapid infinite loops
[ ] Restore active market subscription after reconnect
```

A recommended approach is controlled retry with increasing delay.

Do not reconnect after an intentional component cleanup unless the chart becomes active again.

Track intentional disconnects separately from unexpected failures.

---

# Step 22 — Symbol Configuration

For this milestone, do not build a full symbol search system unless one is already required by the existing UI.

Start with a controlled default symbol.

The symbol should be configurable in code/state.

Recommended concept:

```text

```
