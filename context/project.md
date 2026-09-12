# Project Progress

## Project

Custom Deriv Trading Chart Platform.

The project recreates a Deriv Advanced Chart-style experience using TradingView Lightweight Charts and Deriv market data.

---

# Current Status

**Current Milestone:** Milestone 2 — Authentication

**Current Task:** Complete and verify the authentication flow for registration, login, logout, and protected user retrieval.

---

# Completed

## Project Setup

- [x] Created client folder.
- [x] Created server folder.
- [x] Created context folder.
- [x] Created project architecture documentation.
- [x] Installed client dependencies.
- [x] Installed initial backend dependencies.
- [x] Created initial backend folders.
- [x] Created initial models, controllers, routes, and middleware files.

## Milestone 1 — Backend Foundation

- [x] Configure Express application.
- [x] Configure environment variables.
- [x] Create MongoDB connection utility.
- [x] Connect MongoDB.
- [x] Configure CORS for the React client.
- [x] Configure cookie-parser.
- [x] Add JSON middleware.
- [x] Add a health-check route.
- [x] Start the backend successfully.

## Milestone 2 — Authentication

- [x] Complete User model.
- [x] Create registration endpoint.
- [x] Create login endpoint.
- [x] Hash passwords with bcryptjs.
- [x] Generate JWT tokens.
- [x] Store JWT in HTTP-only cookies.
- [x] Create authentication middleware.
- [x] Create logout endpoint.
- [x] Create `/api/auth/me` endpoint.
- [x] Verify the authentication flow end-to-end.

---

# In Progress

No active work item at the moment. The backend auth foundation is implemented and verified.

---

# Upcoming

## Milestone 3 — Chart Layout Persistence

- [ ] Complete ChartLayout model.
- [ ] Save chart layouts.
- [ ] Load chart layouts.
- [ ] Update chart layouts.
- [ ] Protect chart routes.
      [ ] Get a single chart layout.
      [ ] Delete a chart layout.

## Milestone 4 — Frontend Authentication

- [ ] Configure Tailwind CSS.
- [ ] Configure React Router.
- [ ] Create Axios API client.
- [ ] Create Zustand auth store.
- [ ] Create Register page.
- [ ] Create Login page.
- [ ] Create ProtectedRoute component.
- [ ] Create Dashboard page.

## Milestone 5 — Trading Chart

- [ ] Create Lightweight Charts component.
- [ ] Add candlestick series.
- [ ] Connect Deriv WebSocket.
- [ ] Load historical candles.
- [ ] Receive live updates.
- [ ] Add timeframe switching.

## Milestone 6 — Drawing Tools

- [ ] Horizontal line.
- [ ] Trendline.
- [ ] Rectangle.
- [ ] Drawing selection.
- [ ] Drawing deletion.
- [ ] Drawing persistence.

## Milestone 7 — Offline and Cloud Sync

- [ ] Configure IndexedDB.
- [ ] Save layouts locally.
- [ ] Create pending sync queue.
- [ ] Add debounced autosave.
- [ ] Sync layouts to MongoDB.
- [ ] Restore layouts after login.
- [ ] Handle offline changes.

---

# Important Rules

1. Read `context/project.md` before making architectural changes.
2. Read `context/client.md` before working on the frontend.
3. Read `context/server.md` before working on the backend.
4. Do not skip milestones.
5. Do not introduce unnecessary dependencies.
6. Test each milestone before moving to the next.
7. Update this file after completing a meaningful task.
8. Do not rewrite working functionality without a reason.
9. Never store secrets in the frontend.
10. Never save drawing positions using screen pixels.

---

# Notes

- Deriv provides market data through WebSockets.
- The backend is not responsible for proxying live Deriv market data during the first version.
- MongoDB stores permanent cloud data.
- IndexedDB stores local offline data.
- Zustand manages frontend application state.
- Lightweight Charts renders the chart.
