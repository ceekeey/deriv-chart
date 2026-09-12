# TASK: Build and Test the Complete Frontend Foundation

Before making any changes, read:

1. `context/project.md`
2. `context/client.md`
3. `context/progress.md`

Follow the architecture defined in those files.

Do not redesign the project architecture.

Do not implement real authentication or real chart functionality yet.

The purpose of this task is to create and test the complete frontend foundation.

---

# PRIMARY GOAL

Prepare the React + Vite frontend so that:

1. The application starts successfully.
2. Tailwind CSS v4 is configured correctly.
3. All major routes exist.
4. All major pages exist.
5. Shared layout components exist.
6. Protected route architecture exists.
7. API client architecture exists.
8. Zustand store architecture exists.
9. Dummy pages and responses can be tested.
10. Navigation between routes works.
11. The frontend works correctly with the root project command.

Do not implement real authentication yet.

Do not implement Lightweight Charts yet.

Do not implement Deriv WebSocket yet.

Do not implement IndexedDB synchronization yet.

---

# IMPORTANT RULE

This milestone is only for the frontend skeleton.

Create the files and architecture now.

Use temporary placeholder UI where real functionality has not yet been implemented.

Do not leave important files empty.

Every route should render successfully.

Every imported component must exist.

The application must compile without errors.

---

# CLIENT LOCATION

All frontend work must remain inside:

```text
client/
```

Expected general structure:

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
│   │   │
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
│   │   │   ├── AppLayout.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   └── common/
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ChartPage.jsx
│   │   ├── Profile.jsx
│   │   └── NotFound.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
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
│   ├── hooks/
│   │   ├── useDerivSocket.js
│   │   ├── useChart.js
│   │   ├── useAutosave.js
│   │   └── useOnlineStatus.js
│   │
│   ├── utils/
│   │   ├── indicators.js
│   │   ├── drawingSerializer.js
│   │   ├── debounce.js
│   │   └── timeframes.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── .env.example
├── package.json
└── vite.config.js
```

Create the folders and placeholder files necessary for the architecture.

Do not add unnecessary files.

---

# STEP 1 — VERIFY CLIENT DEPENDENCIES

Verify the following dependencies are installed:

```text
react-router-dom
axios
zustand
lightweight-charts
react-hook-form
zod
@hookform/resolvers
jwt-decode
idb
lucide-react
```

Tailwind development dependencies:

```text
tailwindcss
@tailwindcss/vite
```

Do not add additional dependencies unless absolutely required.

---

# STEP 2 — CONFIGURE TAILWIND CSS V4

This project uses Tailwind CSS v4.

Do NOT use the old Tailwind v3 setup.

Do NOT create:

```text
tailwind.config.js
postcss.config.js
```

unless there is a specific technical reason.

Configure Tailwind using the Vite plugin.

Update:

```text
client/vite.config.js
```

to use:

```text
@tailwindcss/vite
```

The Tailwind plugin must be added alongside the React plugin.

---

# STEP 3 — CONFIGURE index.css

Update:

```text
client/src/index.css
```

Use Tailwind CSS v4 syntax:

```css
@import "tailwindcss";
```

Do not use:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

because those are not the required v4 setup for this project.

Add minimal global styles necessary for:

- Full viewport height.
- Root application sizing.
- Box sizing.
- Body background.
- Text rendering.

Keep the styling minimal.

Do not create the full Deriv UI design yet.

---

# STEP 4 — CREATE CLIENT ENVIRONMENT VARIABLES

Create:

```text
client/.env.example
```

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

Do not put secrets inside the client environment file.

Ensure `.env` is ignored by git.

Only expose safe browser configuration values.

---

# STEP 5 — CONFIGURE AXIOS

Create:

```text
src/api/axios.js
```

Configure Axios with:

- Base URL from `VITE_API_URL`.
- `withCredentials: true`.

All future backend requests must use this centralized Axios instance.

Do not hardcode backend URLs inside React components.

---

# STEP 6 — CREATE PLACEHOLDER API FILES

Create:

```text
src/api/authApi.js
src/api/chartApi.js
```

For now:

- Create the correct module structure.
- Export placeholder functions where appropriate.
- Do not implement real authentication flows.
- Do not implement real chart persistence.

These files must compile correctly.

---

# STEP 7 — CREATE ZUSTAND STORES

Create the following stores.

---

## authStore.js

Prepare state for:

```text
user
isAuthenticated
isLoading
```

Prepare placeholder actions:

```text
login()
logout()
checkAuth()
```

Do not implement real API authentication yet.

The store must compile and be importable.

---

## chartStore.js

Prepare state for:

```text
symbol
timeframe
drawings
indicators
chartSettings
isDirty
syncStatus
```

Prepare actions:

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

Real chart behavior is not required yet.

The store must compile and basic state updates should work.

---

## watchlistStore.js

Prepare state for:

```text
watchlists
activeWatchlist
```

Prepare placeholder actions for future watchlist functionality.

---

# STEP 8 — CREATE SHARED LAYOUT COMPONENTS

Create:

```text
components/layout/AppLayout.jsx
components/layout/Header.jsx
components/layout/Sidebar.jsx
```

The initial layout should be simple.

Use Tailwind CSS.

The layout should provide navigation links for:

```text
Dashboard
Chart
Profile
Logout
```

Logout can temporarily be a dummy action.

Do not implement real logout yet.

The Sidebar and Header must render without errors.

---

# STEP 9 — CREATE AUTH COMPONENTS

Create:

```text
components/auth/ProtectedRoute.jsx
```

For this milestone, authentication is temporary.

The component should provide the route protection architecture.

Because real authentication is not implemented yet, use a temporary development behavior that allows access to protected pages.

Add a clear comment stating that this must be replaced with real authentication logic during the authentication milestone.

Do not permanently hardcode authentication.

---

# STEP 10 — CREATE PLACEHOLDER CHART COMPONENTS

Create:

```text
components/chart/TradingChart.jsx
components/chart/ChartToolbar.jsx
components/chart/DrawingLayer.jsx
components/chart/IndicatorManager.jsx
components/chart/SymbolSelector.jsx
components/chart/TimeframeSelector.jsx
```

These are architectural placeholders.

Do NOT initialize Lightweight Charts yet.

Do NOT connect Deriv WebSocket yet.

Each component should render a simple visible placeholder.

Example:

```text
Trading Chart Placeholder
Chart Toolbar Placeholder
```

The purpose is to test component imports and page architecture.

---

# STEP 11 — CREATE PLACEHOLDER SERVICES

Create:

```text
services/derivSocket.js
services/candleService.js
services/chartStorage.js
services/syncService.js
```

Each service must:

- Exist.
- Export a placeholder function or object.
- Compile correctly.

Do not connect to Deriv yet.

Do not implement IndexedDB yet.

Do not implement cloud synchronization yet.

---

# STEP 12 — CREATE PLACEHOLDER HOOKS

Create:

```text
hooks/useDerivSocket.js
hooks/useChart.js
hooks/useAutosave.js
hooks/useOnlineStatus.js
```

Hooks must:

- Follow React hook naming conventions.
- Be valid imports.
- Return safe placeholder values where necessary.

Do not implement real business logic yet.

---

# STEP 13 — CREATE UTILITY FILES

Create:

```text
utils/indicators.js
utils/drawingSerializer.js
utils/debounce.js
utils/timeframes.js
```

Requirements:

### timeframes.js

This can contain actual static timeframe configuration.

Initial timeframes:

```text
1m
5m
15m
30m
1h
4h
1d
```

### debounce.js

A small reusable debounce utility may be implemented because it is a simple general utility.

### Other utilities

Create placeholder exports if real logic is not required yet.

Do not implement indicator calculations yet.

---

# STEP 14 — CREATE INDEXEDDB MODULE

Create:

```text
db/indexedDb.js
```

Do not implement the complete offline persistence system yet.

Create a clean placeholder architecture.

It must compile without errors.

---

# STEP 15 — CREATE PAGES

Create all pages.

---

## Login Page

Route:

```text
/login
```

Render:

```text
Login Page
Frontend Foundation Test
```

A simple form structure may be created.

Do not connect it to the backend yet.

---

## Register Page

Route:

```text
/register
```

Render:

```text
Register Page
Frontend Foundation Test
```

Do not implement registration yet.

---

## Dashboard Page

Route:

```text
/dashboard
```

This is a protected route.

Render a simple dashboard.

Include visible navigation or links to:

```text
Open Chart
Profile
```

---

## Chart Page

Route:

```text
/chart
```

This is a protected route.

Render:

```text
Symbol Selector
Timeframe Selector
Chart Toolbar
Trading Chart Placeholder
Drawing Layer Placeholder
Indicator Manager
```

The page must render all placeholder chart components.

Do not initialize the actual chart yet.

---

## Profile Page

Route:

```text
/profile
```

This is a protected route.

Render temporary profile information.

---

## Not Found Page

Create:

```text
NotFound.jsx
```

Render a simple 404 page with a link back to the application.

---

# STEP 16 — CREATE ROUTING

Use:

```text
react-router-dom
```

Create:

```text
src/routes/AppRoutes.jsx
```

Configure the following routes:

```text
/            → redirect to /dashboard or another sensible default

/login       → Login

/register    → Register

/dashboard   → Protected Dashboard

/chart       → Protected Chart Page

/profile     → Protected Profile Page

*            → Not Found
```

Use `ProtectedRoute` for:

```text
/dashboard
/chart
/profile
```

Ensure routing works correctly.

---

# STEP 17 — APP ENTRY

Ensure:

```text
main.jsx
```

correctly provides:

```text
BrowserRouter
```

and renders the application.

Keep routing organized.

Do not duplicate routers unnecessarily.

---

# STEP 18 — DUMMY UI TEST

The application should visibly demonstrate that the architecture works.

Test:

```text
/
```

Expected behavior:

Redirect to the default route.

Test:

```text
/login
```

Expected:

Login page renders.

Test:

```text
/register
```

Expected:

Register page renders.

Test:

```text
/dashboard
```

Expected:

Dashboard renders.

Test:

```text
/chart
```

Expected:

All chart placeholder components render.

Test:

```text
/profile
```

Expected:

Profile page renders.

Test:

```text
/random-invalid-route
```

Expected:

404 page renders.

---

# STEP 19 — ROOT DEVELOPMENT COMMAND

Do not break the root project workflow.

The expected root command is:

```bash
npm run dev
```

It should start:

```text
Vite Client
+
Express Server
```

The frontend must also work independently:

```bash
npm run dev --prefix client
```

or through the existing client script.

---

# STEP 20 — TEST FOR BUILD ERRORS

Before completing the task:

1. Run the client.
2. Verify the Vite development server starts.
3. Open the application.
4. Test every route.
5. Check browser console for errors.
6. Check terminal for errors.
7. Verify Tailwind classes are being applied.
8. Verify all imports resolve.
9. Verify all placeholder components render.
10. Verify the root development command still works.

Also run:

```bash
npm run build --prefix client
```

The frontend production build must complete successfully.

Fix all build errors before finishing.

---

# STEP 21 — UPDATE PROGRESS.md

After completion, update:

```text
context/progress.md
```

Mark only the frontend foundation tasks as complete.

Do not mark the following as completed:

- Real authentication.
- Backend API integration.
- Lightweight Charts.
- Deriv WebSocket.
- Drawing logic.
- IndexedDB persistence.
- Cloud synchronization.

Clearly document that the frontend skeleton and routing foundation are complete.

---

# FINAL CHECKLIST

Before finishing verify:

## Tailwind

- [ ] Tailwind CSS v4 is installed.
- [ ] `@tailwindcss/vite` is configured.
- [ ] `@import "tailwindcss";` exists.
- [ ] Tailwind classes visibly work.
- [ ] No unnecessary Tailwind v3 configuration exists.

## Architecture

- [ ] All required folders exist.
- [ ] All planned placeholder files exist.
- [ ] All imports work.
- [ ] No empty important modules exist.

## Routing

- [ ] Login route works.
- [ ] Register route works.
- [ ] Dashboard route works.
- [ ] Chart route works.
- [ ] Profile route works.
- [ ] Protected route architecture works.
- [ ] Unknown routes show 404.

## Layout

- [ ] Header renders.
- [ ] Sidebar renders.
- [ ] AppLayout renders.
- [ ] Navigation works.

## State

- [ ] authStore imports correctly.
- [ ] chartStore imports correctly.
- [ ] watchlistStore imports correctly.

## API Architecture

- [ ] Central Axios instance exists.
- [ ] Base URL uses environment variables.
- [ ] Credentials are enabled.

## Testing

- [ ] Client starts successfully.
- [ ] Browser console has no errors.
- [ ] Vite terminal has no errors.
- [ ] Every route renders.
- [ ] `npm run build --prefix client` succeeds.
- [ ] Root `npm run dev` still works.

---

# IMPORTANT FINAL INSTRUCTION

Do not implement real application logic yet.

The objective is a stable frontend foundation.

Stop after:

1. Tailwind CSS v4 is working.
2. All routes are working.
3. All pages render.
4. Layout components work.
5. Placeholder architecture is complete.
6. The project builds successfully.

At the end, provide a concise report containing:

1. Files created.
2. Files modified.
3. Routes tested.
4. Build result.
5. Tailwind verification result.
6. Any warnings or issues found.
7. Exact commands used to run the client and root project.

Do not proceed to real authentication or chart implementation until this foundation is verified.
