# TASK: Build and Test the Complete Backend Foundation

Read the following project documentation before making any changes:

1. `context/project.md`
2. `context/server.md`
3. `context/progress.md`

Follow the architecture already defined in those files.

Do not redesign the architecture unless there is a technical problem that prevents the project from running.

---

# PRIMARY GOAL

Create a complete backend foundation for the Custom Deriv Trading Chart Platform.

At this stage, the goal is NOT to implement complete application business logic.

The goal is to:

1. Set up the backend correctly.
2. Connect MongoDB successfully.
3. Create all major backend folders.
4. Create all planned models.
5. Create all planned controllers.
6. Create all planned routes.
7. Create middleware.
8. Wire all routes into the Express application.
9. Add temporary dummy responses.
10. Verify the server starts without errors.
11. Test every available route.
12. Ensure all imports and exports are valid.

The backend must be stable before implementing authentication, chart persistence, or other real features.

---

# IMPORTANT RULE

DO NOT implement full business logic yet.

For example:

- Do not implement password hashing yet.
- Do not implement JWT generation yet.
- Do not implement real login yet.
- Do not implement real chart saving yet.
- Do not implement real watchlist saving yet.
- Do not implement advanced validation yet.

Only create the structure and temporary responses necessary to verify that the architecture works.

---

# BACKEND LOCATION

All backend work must remain inside:

```text
server/
```

Expected structure:

```text
server/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── chartController.js
│   └── watchlistController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   ├── ChartLayout.js
│   └── Watchlist.js
│
├── routes/
│   ├── authRoutes.js
│   ├── chartRoutes.js
│   └── watchlistRoutes.js
│
├── utils/
│   └── generateToken.js
│
├── .env
├── .env.example
├── .gitignore
├── app.js
└── package.json
```

Do not create unnecessary folders or dependencies.

---

# STEP 1 — VERIFY SERVER DEPENDENCIES

Ensure the server has the following dependencies:

```text
express
mongoose
cors
dotenv
bcryptjs
jsonwebtoken
cookie-parser
```

Development dependency:

```text
nodemon
```

Do not add additional dependencies unless absolutely required.

Do not move server dependencies into the client.

---

# STEP 2 — CONFIGURE ENVIRONMENT VARIABLES

Create:

```text
server/.env.example
```

It must contain placeholders similar to:

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

NODE_ENV=development

CLIENT_URL=http://localhost:5173
```

Do not place real secrets into `.env.example`.

Ensure `.env` is included in:

```text
server/.gitignore
```

The `.env` file should never be committed.

---

# STEP 3 — DATABASE CONNECTION

Create:

```text
server/config/db.js
```

Responsibilities:

1. Import mongoose.
2. Read `MONGO_URI` from environment variables.
3. Attempt MongoDB connection.
4. Log a clear success message when connected.
5. Throw or report a clear error when connection fails.

The database connection function must be reusable and exported properly.

Do not connect to MongoDB from random controllers or routes.

MongoDB connection must be centralized.

---

# STEP 4 — CREATE EXPRESS APPLICATION

Configure:

```text
server/app.js
```

The application must:

1. Load environment variables.
2. Create an Express application.
3. Enable JSON request parsing.
4. Enable cookie parsing.
5. Configure CORS.
6. Allow the client URL from `CLIENT_URL`.
7. Enable credentials for cookie-based authentication.
8. Connect to MongoDB before starting the server.
9. Register all application routes.
10. Register error middleware.
11. Start on the configured port.

CORS must support the React/Vite frontend.

Do not use wildcard CORS origin when credentials are enabled.

---

# STEP 5 — CREATE A HEALTH CHECK

Create a temporary health endpoint.

Example:

```text
GET /api/health
```

It should return a successful JSON response confirming:

- Server is running.
- API is reachable.

Example response:

```json
{
  "success": true,
  "message": "Server is running"
}
```

This route must work before continuing.

---

# STEP 6 — CREATE DUMMY MODELS

Create the following Mongoose model files.

## User Model

File:

```text
models/User.js
```

Prepare the schema structure for:

```text
name
email
password
createdAt
updatedAt
```

Do not implement password hashing middleware yet.

Do not implement password comparison methods yet.

The model only needs to compile correctly.

---

## ChartLayout Model

File:

```text
models/ChartLayout.js
```

Prepare fields for:

```text
user
symbol
timeframe
drawings
indicators
chartSettings
syncVersion
createdAt
updatedAt
```

Do not implement chart persistence logic yet.

The schema only needs to compile correctly.

---

## Watchlist Model

File:

```text
models/Watchlist.js
```

Prepare fields for:

```text
user
name
symbols
createdAt
updatedAt
```

Do not implement watchlist logic yet.

---

# STEP 7 — CREATE DUMMY CONTROLLERS

Every controller function must exist and be exported correctly.

For now, every controller should return a simple JSON response.

Example:

```json
{
  "success": true,
  "message": "Temporary endpoint response"
}
```

Do not leave controllers empty.

Do not leave functions undefined.

---

# AUTH CONTROLLER

File:

```text
controllers/authController.js
```

Create placeholder controller functions:

```text
register
login
logout
getCurrentUser
```

Each function should return a temporary response confirming the endpoint works.

Example:

```text
POST /api/auth/register
```

Response:

```json
{
  "success": true,
  "message": "Register endpoint is working"
}
```

Do not implement actual authentication logic yet.

---

# CHART CONTROLLER

File:

```text
controllers/chartController.js
```

Create placeholder functions:

```text
getChartLayout
saveChartLayout
```

Each function must return a temporary JSON response.

Do not connect these functions to real database operations yet.

---

# WATCHLIST CONTROLLER

File:

```text
controllers/watchlistController.js
```

Create placeholder functions:

```text
getWatchlists
createWatchlist
updateWatchlist
deleteWatchlist
```

Each function must return a temporary JSON response.

Do not implement real CRUD logic yet.

---

# STEP 8 — CREATE DUMMY AUTH MIDDLEWARE

File:

```text
middleware/authMiddleware.js
```

Create an authentication middleware placeholder.

For now:

1. Do not verify JWT.
2. Do not query MongoDB.
3. Temporarily allow requests to continue.
4. Call `next()` correctly.

Add a clear comment explaining that real JWT verification will be implemented during the authentication milestone.

Ensure protected route architecture can already be wired without breaking the server.

---

# STEP 9 — CREATE ERROR MIDDLEWARE

File:

```text
middleware/errorMiddleware.js
```

Create a basic error-handling middleware.

It should:

1. Catch application errors.
2. Log errors during development.
3. Return a consistent JSON error format.

Example:

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

The middleware must be registered after all routes.

---

# STEP 10 — CREATE PLACEHOLDER TOKEN UTILITY

File:

```text
utils/generateToken.js
```

Create the file and export a placeholder function.

Do not implement real JWT generation yet.

The purpose is to establish the architecture and imports.

---

# STEP 11 — CREATE ALL ROUTES

All routes must be connected to their controller functions.

Do not leave route files empty.

---

# AUTH ROUTES

File:

```text
routes/authRoutes.js
```

Create:

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

The `/me` route should already use the placeholder authentication middleware.

Example architecture:

```text
/me
 ↓
authMiddleware
 ↓
getCurrentUser
```

---

# CHART ROUTES

File:

```text
routes/chartRoutes.js
```

Create:

```text
GET /api/charts/:symbol/:timeframe

PUT /api/charts/:symbol/:timeframe
```

Both routes should use the placeholder authentication middleware.

---

# WATCHLIST ROUTES

File:

```text
routes/watchlistRoutes.js
```

Create:

```text
GET    /api/watchlists

POST   /api/watchlists

PUT    /api/watchlists/:id

DELETE /api/watchlists/:id
```

All watchlist routes should use the placeholder authentication middleware.

---

# STEP 12 — REGISTER ALL ROUTES

Register routes inside:

```text
server/app.js
```

Expected route groups:

```text
/api/health

/api/auth

/api/charts

/api/watchlists
```

Ensure no route conflicts exist.

---

# STEP 13 — SERVER TESTING

Before declaring this task complete, test the backend.

At minimum verify:

## Server Startup

The command:

```bash
npm run dev
```

must start successfully.

There must be no:

- Module not found errors.
- Undefined controller errors.
- Invalid imports.
- Duplicate model compilation errors.
- Express route errors.
- Environment loading errors.

---

## Health Endpoint

Test:

```text
GET /api/health
```

Expected:

```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## Auth Endpoints

Test:

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

All endpoints must respond successfully with their temporary responses.

---

## Chart Endpoints

Test:

```text
GET /api/charts/test-symbol/1h

PUT /api/charts/test-symbol/1h
```

Both must respond successfully.

---

## Watchlist Endpoints

Test:

```text
GET /api/watchlists

POST /api/watchlists

PUT /api/watchlists/test-id

DELETE /api/watchlists/test-id
```

All must respond successfully.

---

# STEP 14 — ROOT PROJECT COMMANDS

The project uses the root `package.json` as the main command controller.

Do not break the existing root development workflow.

The expected command should remain:

```bash
npm run dev
```

This should run:

```text
React client
+
Express server
```

If the client is not ready to run, the backend must still be independently testable using its server script.

Do not change root scripts unnecessarily.

---

# STEP 15 — UPDATE PROJECT PROGRESS

After successfully completing and testing the backend foundation, update:

```text
context/progress.md
```

Mark completed items accurately.

Do not mark unfinished business logic as completed.

The progress file should clearly state:

```text
Completed:
Backend architecture and dummy routes/controllers.

Not completed:
Real authentication logic.
Real JWT verification.
Password hashing.
Chart database persistence.
Watchlist CRUD.
```

---

# FINAL VERIFICATION CHECKLIST

Before finishing, verify:

- [ ] MongoDB connection utility exists.
- [ ] Environment variables are configured.
- [ ] `.env.example` exists.
- [ ] `.env` is ignored.
- [ ] Express starts.
- [ ] JSON middleware works.
- [ ] cookie-parser works.
- [ ] CORS works with credentials.
- [ ] Health route works.
- [ ] User model compiles.
- [ ] ChartLayout model compiles.
- [ ] Watchlist model compiles.
- [ ] Auth controller exports all functions.
- [ ] Chart controller exports all functions.
- [ ] Watchlist controller exports all functions.
- [ ] Auth middleware exists.
- [ ] Error middleware exists.
- [ ] Token utility exists.
- [ ] Auth routes work.
- [ ] Chart routes work.
- [ ] Watchlist routes work.
- [ ] All routes are registered.
- [ ] No broken imports.
- [ ] No unnecessary dependencies added.
- [ ] Root development workflow is not broken.
- [ ] `context/progress.md` is updated.

---

# IMPORTANT FINAL INSTRUCTION

Do not move to implementing real authentication or real database CRUD.

Stop after the backend foundation is fully created and tested.

At the end, provide a concise report containing:

1. Files created.
2. Files modified.
3. Routes created.
4. Test results.
5. Any warnings or issues found.
6. The exact command used to start the backend.

The backend skeleton must be stable before any real business logic is added.
