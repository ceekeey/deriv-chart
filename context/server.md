# Server Architecture

## 1. Server Overview

The backend is responsible for application data and authentication.

The backend is not initially responsible for streaming Deriv market data.

Primary responsibilities:

- User registration
- User login
- User logout
- JWT authentication
- Protected routes
- Chart layout storage
- Drawing storage
- Watchlist storage
- Cloud synchronization

---

# 2. Dependencies

Install production dependencies:

```bash
npm install express mongoose cors dotenv bcryptjs jsonwebtoken cookie-parser
```

Install development dependency:

```bash
npm install -D nodemon
```

---

# 3. Dependency Purpose

## express

REST API server.

## mongoose

MongoDB object modeling.

## cors

Allows communication between frontend and backend.

Must support credentialed requests when using HTTP-only authentication cookies.

## dotenv

Loads environment variables.

## bcryptjs

Hashes passwords securely.

Never store plain-text passwords.

## jsonwebtoken

Creates and verifies JWT authentication tokens.

## cookie-parser

Parses HTTP cookies.

## nodemon

Restarts the development server automatically.

---

# 4. Recommended Folder Structure

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
├── server.js
└── package.json
```

---

# 5. User Model

The User model should initially contain:

```text
name
email
password
createdAt
updatedAt
```

Password requirements:

1. Password must be hashed before saving.
2. Plain passwords must never be stored.
3. The password field should normally not be returned in API responses.

---

# 6. Authentication Flow

## Register

```text
POST /api/auth/register

Validate input
      ↓
Check existing user
      ↓
Hash password
      ↓
Create user
      ↓
Generate JWT
      ↓
Set HTTP-only cookie
      ↓
Return safe user data
```

## Login

```text
POST /api/auth/login

Find user
      ↓
Compare password
      ↓
Generate JWT
      ↓
Set HTTP-only cookie
      ↓
Return safe user data
```

## Logout

```text
POST /api/auth/logout

Clear authentication cookie
      ↓
Return success
```

## Current User

```text
GET /api/auth/me
```

This route requires authentication.

---

# 7. Authentication Middleware

The middleware should:

```text
Read JWT from cookie
        ↓
Verify JWT
        ↓
Find user
        ↓
Attach user to req.user
        ↓
Continue request
```

If authentication fails:

```text
Return 401 Unauthorized
```

---

# 8. Chart Layout Model

Recommended structure:

```text
ChartLayout
│
├── user
├── symbol
├── timeframe
├── drawings
├── indicators
├── chartSettings
├── syncVersion
├── createdAt
└── updatedAt
```

Important:

Create a compound unique index where appropriate so a user does not accidentally create duplicate layouts for the same saved layout identity.

A possible identity is:

```text
user + symbol + timeframe
```

Later this can be expanded to support named layouts.

---

# 9. Chart API

Recommended initial endpoints:

## Get Chart Layout

```text
GET /api/charts/:symbol/:timeframe
```

## Save or Update Chart Layout

```text
PUT /api/charts/:symbol/:timeframe
```

Request body:

```json
{
  "drawings": [],
  "indicators": [],
  "chartSettings": {}
}
```

The backend identifies the user from authentication middleware.

Never trust a `userId` sent from the frontend.

---

# 10. Autosave API Design

The frontend sends a debounced request.

Example:

```text
PUT /api/charts/frxEURUSD/4h
```

The backend:

```text
Authenticate user
        ↓
Validate layout data
        ↓
Find existing layout
        ↓
Create or update
        ↓
Update updatedAt
        ↓
Return saved layout
```

Use an upsert-style approach where appropriate.

---

# 11. Watchlist API

Initial endpoints:

```text
GET    /api/watchlists
POST   /api/watchlists
PUT    /api/watchlists/:id
DELETE /api/watchlists/:id
```

All watchlists belong to the authenticated user.

---

# 12. Environment Variables

Example server `.env`:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=use_a_long_random_secret

NODE_ENV=development

CLIENT_URL=http://localhost:5173
```

Never commit `.env`.

Add it to `.gitignore`.

---

# 13. CORS Requirements

The backend must allow the client origin.

Because authentication uses cookies, CORS must be configured for credentialed requests.

Important concepts:

```text
origin = client URL
credentials = true
```

Do not use an unrestricted wildcard origin with credentialed cookies.

---

# 14. API Error Format

Use a consistent format.

Example:

```json
{
  "success": false,
  "message": "Error description"
}
```

Successful responses:

```json
{
  "success": true,
  "data": {}
}
```

Keep API responses predictable.

---

# 15. Security Rules

1. Hash passwords.
2. Never return password hashes.
3. Use HTTP-only cookies.
4. Protect private routes.
5. Never trust user IDs sent by clients.
6. Validate request input.
7. Keep secrets in environment variables.
8. Restrict CORS origins.
9. Add rate limiting later for production.
10. Use HTTPS in production.

---

# 16. Server Development Order

## Step 1

Create:

```text
server.js
config/db.js
.env
```

Connect Express and MongoDB.

## Step 2

Create:

```text
User model
Auth controller
Auth routes
Auth middleware
```

Test registration and login.

## Step 3

Create:

```text
ChartLayout model
Chart controller
Chart routes
```

Test save and restore.

## Step 4

Create:

```text
Watchlist model
Watchlist controller
Watchlist routes
```

## Step 5

Add production improvements:

- Validation
- Rate limiting
- Better error handling
- Logging
- Refresh token strategy if needed

---

# 17. Server Rules for the Coding Agent

The coding agent must:

1. Work milestone by milestone.
2. Avoid unnecessary packages.
3. Keep controllers small.
4. Keep database models separate.
5. Protect private routes.
6. Never expose secrets.
7. Never trust client-provided ownership IDs.
8. Return consistent API responses.
9. Avoid breaking existing functionality.
10. Test every endpoint before moving to the next milestone.

The first implementation priority is:

```text
MongoDB Connection
        ↓
User Model
        ↓
Register
        ↓
Login
        ↓
Logout
        ↓
Protected /me Route
        ↓
Chart Layout Save/Load
```
