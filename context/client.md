# Client Architecture

## 1. Client Overview

The frontend is a React application created with Vite.

The client is responsible for:

- User interface
- Authentication pages
- Protected routes
- Deriv WebSocket connection
- Historical and live market data
- Lightweight Charts rendering
- Drawing tools
- Indicators
- Chart state
- Local persistence using IndexedDB
- Cloud synchronization with the backend

---

# 2. Dependencies

Install the following production dependencies:

```bash
npm install react-router-dom axios zustand lightweight-charts react-hook-form zod @hookform/resolvers jwt-decode idb lucide-react
```

Install Tailwind dependencies:

```bash
npm install -D tailwindcss @tailwindcss/vite
```

## Dependency Purpose

### react-router-dom

Routing between:

- Login
- Register
- Dashboard
- Chart

### axios

Communication with the Express backend.

Axios requests must use credentials when authentication cookies are required.

### zustand

Global state management.

Use Zustand for:

- Authentication state
- Current symbol
- Current timeframe
- Drawings
- Indicators
- Chart settings
- Sync status

### lightweight-charts

The chart rendering engine.

Used for:

- Candlesticks
- Line series
- Price lines
- Time scale
- Chart interactions

### react-hook-form

Form management.

Used for:

- Login
- Register
- Future profile forms

### zod

Schema validation.

### @hookform/resolvers

Connect Zod validation to React Hook Form.

### idb

IndexedDB wrapper.

Used for:

- Offline chart layouts
- Pending synchronization changes

### lucide-react

Icons for the platform UI.

### jwt-decode

Optional JWT payload decoding on the client.

Do not treat decoded JWT data as secure authorization.

---

# 3. Recommended Folder Structure

```text
client/
│
├── src/
│   │
│   ├── api/
│   │   ├── axios.js
│   │   ├── authApi.js
│   │   └── chartApi.js
│   │
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── chart/
│   │   │   ├── TradingChart.jsx
│   │   │   ├── ChartToolbar.jsx
│   │   │   ├── DrawingLayer.jsx
│   │   │   ├── IndicatorManager.jsx
│   │   │   ├── SymbolSelector.jsx
│   │   │   └── TimeframeSelector.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   └── AppLayout.jsx
│   │   │
│   │   └── common/
│   │
│   ├── hooks/
│   │   ├── useDerivSocket.js
│   │   ├── useChart.js
│   │   ├── useAutosave.js
│   │   └── useOnlineStatus.js
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ChartPage.jsx
│   │   └── Profile.jsx
│   │
│   ├── store/
│   │   ├── authStore.js
│   │   ├── chartStore.js
│   │   └── watchlistStore.js
│   │
│   ├── services/
│   │   ├── derivSocket.js
│   │   ├── candleService.js
│   │   ├── chartStorage.js
│   │   └── syncService.js
│   │
│   ├── db/
│   │   └── indexedDb.js
│   │
│   ├── utils/
│   │   ├── indicators.js
│   │   ├── drawingSerializer.js
│   │   ├── debounce.js
│   │   └── timeframes.js
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── package.json
└── vite.config.js
```

---

# 4. State Management

Use Zustand.

## authStore

Responsible for:

```text
user
isAuthenticated
isLoading
login()
logout()
checkAuth()
```

## chartStore

Responsible for:

```text
symbol
timeframe
drawings
indicators
chartSettings
isDirty
syncStatus
```

Important actions:

```text
setSymbol()
setTimeframe()

addDrawing()
updateDrawing()
removeDrawing()

addIndicator()
updateIndicator()
removeIndicator()

markDirty()
markSynced()
```

---

# 5. Deriv WebSocket

The Deriv WebSocket connection must be encapsulated.

Do not place WebSocket logic directly inside random UI components.

Use:

```text
services/derivSocket.js
```

or:

```text
hooks/useDerivSocket.js
```

The chart component should consume normalized candle/tick data.

---

# 6. Chart Component Responsibilities

`TradingChart.jsx` should:

1. Create the Lightweight Chart.
2. Create the candlestick series.
3. Load candle data.
4. Update candle data.
5. Handle chart resize.
6. Clean up chart resources.

It should not contain:

- Authentication logic
- Database logic
- Large API logic
- Indicator calculation logic

Keep responsibilities separated.

---

# 7. Drawing Layer

The drawing layer must sit above the chart.

Possible architecture:

```text
Chart Container
│
├── Lightweight Charts Canvas
│
└── Drawing Overlay
    │
    ├── Horizontal Lines
    ├── Trendlines
    └── Rectangles
```

Drawing coordinates must be based on:

```text
time
price
```

Never permanent screen coordinates.

---

# 8. Autosave

Autosave must be implemented separately from UI components.

Flow:

```text
Chart Store Changes
        ↓
Save to IndexedDB immediately
        ↓
Set isDirty = true
        ↓
Debounced cloud save
        ↓
POST/PUT to backend
        ↓
Set isDirty = false
```

Recommended debounce:

```text
1500–3000 milliseconds
```

---

# 9. API Client

Configure Axios centrally.

Example responsibilities:

```text
Base URL
withCredentials
Error handling
Authentication handling
```

All backend communication should use the centralized API layer.

---

# 10. Client Environment Variables

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

Only expose values that are safe for the browser.

Never place:

- MongoDB URI
- JWT secret
- Database passwords

inside the client `.env`.

---

# 11. Client Coding Rules

1. Use reusable components.
2. Keep business logic outside UI where possible.
3. Use Zustand for shared state.
4. Use IndexedDB for persistent offline storage.
5. Clean up WebSocket connections.
6. Clean up Lightweight Charts instances.
7. Avoid unnecessary rerenders.
8. Debounce cloud saving.
9. Do not use localStorage for sensitive authentication tokens.
10. Never hardcode backend URLs in components.
