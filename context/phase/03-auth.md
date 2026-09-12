# Milestone 2 — Authentication

## Objective

Implement a complete, secure authentication foundation for the Chart application.

The authentication system must support:

- User registration
- User login
- Password hashing using `bcryptjs`
- JWT generation using `jsonwebtoken`
- JWT storage in HTTP-only cookies
- Authentication middleware for protected routes
- Logout
- Getting the currently authenticated user

The goal of this milestone is to build a clean authentication foundation that future milestones can use for charts, watchlists, trading accounts, user settings, portfolios, and other user-specific data.

---

# Important Instructions

Before writing code:

1. Inspect the existing repository.
2. Understand the current backend structure created in Milestone 1.
3. Reuse the existing architecture, naming conventions, module system, error handling patterns, and route/controller structure.
4. Do not unnecessarily restructure the project.
5. Do not implement unrelated features.
6. Do not add trading logic, chart logic, broker APIs, watchlists, portfolios, or frontend authentication logic in this milestone.
7. Make sure the server still starts successfully after every implementation stage.
8. Fix any integration problems caused by this milestone.
9. Do not leave broken imports, unused required files, placeholder authentication logic, or routes that crash.
10. Test the complete authentication flow before considering the milestone complete.

---

# Milestone Checklist

Implement and complete:

- [ ] Complete User model
- [ ] Create registration endpoint
- [ ] Create login endpoint
- [ ] Hash passwords with bcryptjs
- [ ] Generate JWT tokens
- [ ] Store JWT in HTTP-only cookies
- [ ] Create authentication middleware
- [ ] Create logout endpoint
- [ ] Create `GET /api/auth/me` endpoint
- [ ] Test all authentication endpoints
- [ ] Verify the backend still starts successfully

---

# Step 1 — Inspect Existing Backend

First inspect the existing backend and identify:

- Application entry point
- Express application configuration
- Database connection setup
- Existing routes
- Existing controllers
- Existing middleware
- Existing response format
- Existing error handling
- Environment variable setup
- Module system used by the project

Do not assume CommonJS or ES Modules.

Use whichever system the project already uses.

Examples:

If the project uses:

```js
import express from "express";
```

continue using ES Modules.

If the project uses:

```js
const express = require("express");
```

continue using CommonJS.

Do not mix module systems.

---

# Step 2 — Install Required Dependencies

Ensure the backend has the required dependencies.

Required packages:

```bash
bcryptjs
jsonwebtoken
cookie-parser
```

If they are already installed, do not reinstall unnecessarily.

Also confirm that existing dependencies required for the backend remain functional.

Examples may include:

```bash
express
mongoose
dotenv
cors
```

Do not add unnecessary authentication libraries.

Do not use Passport unless the existing project already depends on it.

Authentication should be implemented using:

- `bcryptjs`
- `jsonwebtoken`
- HTTP-only cookies

---

# Step 3 — Complete the User Model

Locate the existing User model.

If a User model already exists, complete it rather than creating a duplicate.

The model should contain at minimum:

```text
username
email
password
createdAt
updatedAt
```

Recommended requirements:

### username

- Required
- Trimmed
- Has a reasonable minimum and maximum length
- Unique if the current project requirements expect usernames to be unique

### email

- Required
- Unique
- Lowercased
- Trimmed
- Validated as an email address

### password

- Required
- Never returned in normal API responses
- Stored as a bcrypt hash
- Has a reasonable minimum length

Use timestamps if supported by the existing ORM/database setup.

For MongoDB/Mongoose, the model should use timestamps rather than manually maintaining `createdAt` and `updatedAt`.

---

# Password Hashing Requirement

Passwords must never be stored in plain text.

Use `bcryptjs`.

The implementation may use either:

1. Password hashing inside the controller before saving the user, or
2. A model pre-save hook

Choose the approach that best matches the existing architecture.

Avoid hashing a password twice.

The final database record must contain a bcrypt hash.

---

# Step 4 — Create Authentication Routes

Create or complete the authentication routes.

Required routes:

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

Use the existing route registration pattern.

Example structure only:

```text
routes/
└── auth.routes.js
```

Do not create duplicate route prefixes.

For example, if the application already mounts routes using:

```text
/api/auth
```

then route definitions inside the router should not repeat `/api/auth`.

---

# Step 5 — Registration Endpoint

Implement:

```text
POST /api/auth/register
```

Expected request body:

```json
{
  "username": "exampleUser",
  "email": "user@example.com",
  "password": "password123"
}
```

Registration flow:

1. Validate required fields.
2. Validate the email format.
3. Validate the password requirements.
4. Normalize the email where appropriate.
5. Check whether a user with the email already exists.
6. Reject duplicate registration.
7. Hash the password using bcryptjs.
8. Create the user.
9. Generate a JWT token.
10. Store the JWT inside an HTTP-only cookie.
11. Return a safe user object.
12. Never return the password or password hash.

Recommended successful response format:

```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "USER_ID",
      "username": "exampleUser",
      "email": "user@example.com"
    }
  }
}
```

The exact response structure may follow the project's existing API response convention if one already exists.

---

# Step 6 — Login Endpoint

Implement:

```text
POST /api/auth/login
```

Expected request body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Login flow:

1. Validate required fields.
2. Normalize the email.
3. Find the user using the email.
4. If the user does not exist, return a safe authentication error.
5. Compare the submitted password against the stored bcrypt hash.
6. If the password is incorrect, return the same safe authentication error.
7. Generate a JWT.
8. Store the JWT in an HTTP-only cookie.
9. Return safe user data.
10. Never return the password or password hash.

Recommended successful response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "USER_ID",
      "username": "exampleUser",
      "email": "user@example.com"
    }
  }
}
```

Recommended invalid credentials response:

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

Do not reveal whether:

- The email does not exist, or
- The password is incorrect

Use a generic invalid credentials response.

---

# Step 7 — JWT Utility

Create a reusable JWT utility if the existing project architecture supports utility/helper files.

Recommended structure:

```text
utils/
└── generateToken.js
```

The utility should:

1. Receive the user's ID.
2. Generate a JWT.
3. Use the JWT secret from environment variables.
4. Include an expiration.
5. Return the token.

The JWT payload should contain only the minimum required identity information.

Recommended payload:

```text
userId
```

Do not store sensitive user information inside the JWT payload.

Do not store:

```text
password
password hash
bank information
broker credentials
```

---

# Step 8 — Environment Variables

Use environment variables for authentication configuration.

Required variables should include something equivalent to:

```env
JWT_SECRET=
JWT_EXPIRES_IN=
```

Cookie configuration should also be configurable where useful.

Do not hardcode the production JWT secret in source code.

If the project contains an `.env.example`, update it with required variable names but do not place real secrets inside it.

Example:

```env
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

If the existing project uses different naming conventions, follow those conventions.

---

# Step 9 — HTTP-Only JWT Cookie

JWTs must be stored in cookies.

Do not return the JWT to the frontend as part of the normal JSON response.

Do not store the JWT in localStorage.

Configure the cookie securely.

Minimum configuration:

```text
httpOnly: true
secure: true in production
secure: false in local development when HTTPS is unavailable
sameSite: appropriate for the frontend/backend deployment architecture
```

The cookie expiration should align with the JWT expiration.

The implementation must work correctly for the current development environment.

If the frontend and backend run on different origins during development, ensure the configuration is compatible with cookie authentication.

---

# Step 10 — Configure Cookie Parser

Ensure `cookie-parser` is configured correctly in the Express application.

The middleware must be registered before routes that depend on reading cookies.

The authentication middleware should be able to access cookies through the request object.

Do not break existing middleware order.

---

# Step 11 — Configure CORS for Cookie Authentication

Inspect the current CORS configuration.

If the frontend and backend run on separate origins, configure CORS so authenticated cookie requests can work.

The configuration must support credentials.

Ensure the frontend can later send requests using credentials.

Do not use an unsafe wildcard origin together with credentials.

Use environment configuration for allowed origins if the project architecture already supports this.

Example conceptually:

```text
origin: FRONTEND_URL
credentials: true
```

Do not blindly overwrite existing CORS configuration.

Integrate authentication requirements into the existing configuration.

---

# Step 12 — Authentication Middleware

Create authentication middleware.

Recommended structure:

```text
middleware/
└── auth.middleware.js
```

The middleware should:

1. Read the JWT from the HTTP-only cookie.
2. Check whether the token exists.
3. Verify the token using the JWT secret.
4. Extract the user ID from the token.
5. Find the user if necessary.
6. Attach authenticated user information to the request.
7. Call `next()` if authentication succeeds.
8. Return an unauthorized response if authentication fails.

Recommended request property:

```text
req.user
```

Do not attach sensitive information such as the password hash.

The middleware must handle:

```text
No token
Invalid token
Expired token
Deleted user
Malformed token
```

without crashing the server.

Example conceptual flow:

```text
Incoming Request
      ↓
Read JWT Cookie
      ↓
Token Exists?
  ↙          ↘
No            Yes
↓              ↓
401         Verify JWT
                 ↓
            Find User
                 ↓
            Attach req.user
                 ↓
               next()
```

---

# Step 13 — `/api/auth/me` Endpoint

Implement:

```text
GET /api/auth/me
```

This route must be protected using the authentication middleware.

Flow:

```text
Request
   ↓
Authentication Middleware
   ↓
Authenticated?
 ↙            ↘
No              Yes
↓                ↓
401            Return User
```

Successful response should return safe user information.

Example:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "USER_ID",
      "username": "exampleUser",
      "email": "user@example.com"
    }
  }
}
```

Never return:

```text
password
password hash
JWT secret
JWT token
```

---

# Step 14 — Logout Endpoint

Implement:

```text
POST /api/auth/logout
```

Logout should:

1. Clear the authentication cookie.
2. Use cookie options compatible with the options used when setting the cookie.
3. Return a success response.

Example:

```json
{
  "success": true,
  "message": "Logout successful"
}
```

Ensure the cookie is actually removed in the browser.

Do not simply return a success response while leaving the authentication cookie active.

---

# Step 15 — Safe User Serialization

Create a consistent approach for returning user information.

The following should normally be safe:

```text
id
username
email
createdAt
updatedAt
```

The password must never be included.

If using Mongoose, consider using:

- `select: false`
- Explicit `.select()`
- A custom `toJSON` transformation
- A dedicated user serialization helper

Choose the approach that best matches the existing architecture.

The final implementation should make accidental password exposure difficult.

---

# Step 16 — Error Handling

Follow the project's existing error handling system.

Authentication errors should not expose internal implementation details.

Examples of expected errors:

### Missing fields

```json
{
  "success": false,
  "message": "Email and password are required"
}
```

### Duplicate email

```json
{
  "success": false,
  "message": "An account with this email already exists"
}
```

### Invalid credentials

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### Unauthorized

```json
{
  "success": false,
  "message": "Authentication required"
}
```

Avoid returning:

```text
Database stack traces
JWT secret information
Internal server paths
Password details
Raw bcrypt errors
```

---

# Step 17 — API Testing

Test the complete authentication flow.

## Registration Tests

Test:

```text
[ ] Register with valid data
[ ] Reject missing username
[ ] Reject missing email
[ ] Reject missing password
[ ] Reject invalid email
[ ] Reject weak/invalid password according to project rules
[ ] Reject duplicate email
[ ] Confirm password is hashed in database
[ ] Confirm password is not returned in API response
[ ] Confirm authentication cookie is created
```

---

## Login Tests

Test:

```text
[ ] Login with valid credentials
[ ] Login with incorrect password
[ ] Login with nonexistent email
[ ] Confirm JWT cookie is created
[ ] Confirm password is never returned
```

---

## Middleware Tests

Test:

```text
[ ] Access protected route with valid authentication
[ ] Access protected route without authentication
[ ] Access protected route with invalid JWT
[ ] Access protected route with expired JWT if practical
```

---

## `/api/auth/me` Tests

Test:

```text
[ ] Authenticated user can access /api/auth/me
[ ] Unauthenticated user receives 401
[ ] Returned user data does not contain password
```

---

## Logout Tests

Test:

```text
[ ] Logout endpoint responds successfully
[ ] Authentication cookie is cleared
[ ] Accessing /api/auth/me after logout returns unauthorized
```

---

# Step 18 — Server Verification

After implementation:

1. Start the backend from the project root using the existing root scripts.
2. Confirm the backend starts successfully.
3. Confirm the database connection still works.
4. Confirm all existing routes still work.
5. Confirm authentication routes are mounted correctly.
6. Confirm there are no module import errors.
7. Confirm there are no missing environment variable crashes that make development impossible.
8. Confirm the root `package.json` scripts still work as intended.

Do not change the root project structure unnecessarily.

---

# Expected Final File Structure

Follow the existing structure.

A typical implementation may look similar to:

```text
server/
├── controllers/
│   └── auth.controller.js
│
├── middleware/
│   └── auth.middleware.js
│
├── models/
│   └── User.js
│
├── routes/
│   └── auth.routes.js
│
├── utils/
│   └── generateToken.js
│
├── config/
│   └── ...
│
└── ...
```

Do not force this exact structure if Milestone 1 already uses a different but clean architecture.

---

# Scope Restrictions

For this milestone, do NOT implement:

- Trading execution
- Broker API integration
- Deriv integration
- Chart WebSockets
- Market data
- Watchlists
- Portfolio management
- Deposits or withdrawals
- Payments
- Password reset
- Email verification
- OAuth
- Two-factor authentication
- Frontend authentication pages

Those can be implemented in later milestones.

Focus only on building a solid authentication foundation.

---

# Definition of Done

Milestone 2 is complete only when all of the following are true:

```text
[ ] User model is complete
[ ] Passwords are hashed with bcryptjs
[ ] Registration works
[ ] Login works
[ ] JWT tokens are generated
[ ] JWT is stored in HTTP-only cookies
[ ] cookie-parser works correctly
[ ] CORS supports credential-based authentication where required
[ ] Authentication middleware works
[ ] GET /api/auth/me works
[ ] POST /api/auth/logout works
[ ] Password hashes are never returned
[ ] Unauthorized requests are handled safely
[ ] Authentication errors do not crash the server
[ ] Existing backend functionality still works
[ ] Server starts successfully from the root project scripts
[ ] All authentication endpoints have been tested
```

---

# Final Agent Report

After implementation and testing, provide a concise report containing:

## 1. Files Created

List every new file.

## 2. Files Modified

List every modified file.

## 3. Authentication Flow

Briefly explain:

```text
Registration → Password Hashing → User Creation → JWT → HTTP-only Cookie

Login → Password Verification → JWT → HTTP-only Cookie

Protected Request → Cookie → Auth Middleware → req.user

Logout → Clear Cookie
```

## 4. Environment Variables Required

List the required variable names only.

Do not expose secrets.

## 5. Routes Implemented

List all authentication routes.

## 6. Test Results

Report the result of each major authentication test.

## 7. Problems Fixed

Mention any integration or server startup issues discovered and fixed.

Do not claim the milestone is complete unless the implementation has actually been tested successfully.
