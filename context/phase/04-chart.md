# Milestone 3 — Chart Layout Persistence

## Objective

Implement persistent user-owned chart layouts for the Chart application.

Users should be able to:

- Save chart layouts
- Load all their saved chart layouts
- Load a single chart layout
- Update an existing chart layout
- Delete a chart layout
- Access only layouts that belong to them

All chart layout routes must be protected using the authentication system created in Milestone 2.

The main security requirement is:

> A user must never be able to access, modify, or delete another user's chart layout.

This milestone focuses only on backend persistence and API functionality.

Do not implement real-time chart data, broker integration, chart rendering, WebSockets, or frontend UI logic in this milestone.

---

# Important Instructions

Before writing code:

1. Inspect the existing repository.
2. Inspect the backend architecture created during Milestone 1.
3. Inspect the authentication implementation created during Milestone 2.
4. Identify the existing:
   - Database connection
   - User model
   - Authentication middleware
   - Route structure
   - Controller structure
   - Error handling system
   - API response format
   - Module system

5. Reuse existing patterns and naming conventions.
6. Do not unnecessarily restructure the project.
7. Do not duplicate authentication middleware.
8. Do not create a second User model.
9. Do not break existing authentication routes.
10. Make sure the application still starts successfully from the root project scripts.
11. Test every chart layout endpoint before considering the milestone complete.

---

# Milestone Checklist

Implement and complete:

- [ ] Complete ChartLayout model
- [ ] Create protected chart layout routes
- [ ] Save chart layouts
- [ ] Load all chart layouts
- [ ] Load a single chart layout
- [ ] Update chart layouts
- [ ] Delete chart layouts
- [ ] Protect every chart layout route
- [ ] Enforce layout ownership
- [ ] Prevent user ID spoofing
- [ ] Test cross-user access
- [ ] Verify server startup

---

# Step 1 — Inspect Existing Authentication

Before implementing chart layouts, inspect the authentication middleware from Milestone 2.

Determine:

1. How JWT authentication is implemented.
2. Where the authenticated user is attached to the request.
3. Whether the middleware uses:

```text
req.user
```

or another property.

4. Whether the attached user contains:

```text
id
_id
```

or another identifier format.

Use the existing authentication implementation.

Do not change the authentication system unless a genuine integration bug must be fixed.

The chart layout system should obtain the authenticated user directly from the authentication middleware.

Conceptually:

```text
Incoming Request
        ↓
Authentication Middleware
        ↓
JWT Verified
        ↓
Authenticated User
        ↓
req.user
        ↓
Chart Layout Controller
```

---

# Step 2 — Complete the ChartLayout Model

Locate the existing ChartLayout model.

If it already exists, complete it.

Do not create duplicate models.

The model should contain at minimum:

```text
user
name
symbol
timeframe
layout
createdAt
updatedAt
```

Recommended conceptual structure:

```text
ChartLayout
│
├── user
│     └── Reference to User
│
├── name
│
├── symbol
│
├── timeframe
│
├── layout
│     └── Flexible chart configuration
│
├── createdAt
│
└── updatedAt
```

---

# Step 3 — User Ownership

The `user` field is required.

It must reference the authenticated user who owns the layout.

For MongoDB/Mongoose, this should normally be an ObjectId reference to the User model.

Example conceptually:

```text
ChartLayout.user → User._id
```

The user ID must never come from the request body.

The backend must assign ownership using the authenticated user.

Correct concept:

```text
layout.user = req.user.id
```

Incorrect concept:

```text
layout.user = req.body.userId
```

The frontend must not be allowed to choose which user owns a layout.

---

# Step 4 — Layout Field Design

The `layout` field should support flexible chart configuration.

Do not create a separate database column or schema field for every future chart feature.

Use a flexible object/JSON structure appropriate for the project's database technology.

The layout may eventually contain:

```text
chart type
candlestick settings
theme
indicators
indicator settings
drawings
trendlines
horizontal lines
support zones
resistance zones
rectangles
Fibonacci tools
chart colors
pane configuration
zoom state
other chart metadata
```

For this milestone, do not implement validation for every possible chart feature.

The backend should store and return the layout configuration safely.

Example request data:

```json
{
  "name": "EURUSD Analysis",
  "symbol": "EURUSD",
  "timeframe": "4H",
  "layout": {
    "chartType": "candlestick",
    "theme": "dark",
    "indicators": [
      {
        "type": "EMA",
        "period": 50
      }
    ],
    "drawings": []
  }
}
```

The exact shape of `layout` may evolve later.

Avoid making the current model too restrictive.

---

# Step 5 — Model Validation

Add reasonable validation.

Recommended requirements:

## user

- Required
- Must reference a valid user

## name

- Required
- Trimmed
- Reasonable maximum length

## symbol

- Required
- Trimmed
- Normalized consistently if appropriate

Examples:

```text
EURUSD
BTCUSD
ETHUSD
Volatility 75 Index
```

Do not hardcode a fixed list of trading symbols.

The application may support multiple brokers and markets later.

## timeframe

- Required
- Trimmed

Do not make the timeframe unnecessarily restrictive unless the existing application already has a defined timeframe system.

## layout

- Required
- Must support structured configuration data

---

# Step 6 — Create Chart Layout Routes

Create or complete the chart layout routes.

Required API:

```text
POST    /api/chart-layouts
GET     /api/chart-layouts
GET     /api/chart-layouts/:id
PUT     /api/chart-layouts/:id
DELETE  /api/chart-layouts/:id
```

All routes must require authentication.

Conceptually:

```text
POST    /api/chart-layouts          → auth middleware → create layout
GET     /api/chart-layouts          → auth middleware → get user layouts
GET     /api/chart-layouts/:id      → auth middleware → get one layout
PUT     /api/chart-layouts/:id      → auth middleware → update layout
DELETE  /api/chart-layouts/:id      → auth middleware → delete layout
```

Use the existing route mounting structure.

Do not duplicate API prefixes.

For example, if the main application mounts:

```text
/api/chart-layouts
```

then the internal router should define only the route paths needed after that prefix.

---

# Step 7 — Protect Every Chart Layout Route

Every chart layout endpoint must use the authentication middleware.

There must be no public chart layout endpoints.

The following must all require authentication:

```text
POST    /api/chart-layouts
GET     /api/chart-layouts
GET     /api/chart-layouts/:id
PUT     /api/chart-layouts/:id
DELETE  /api/chart-layouts/:id
```

Unauthenticated requests should receive an appropriate unauthorized response.

Example:

```json
{
  "success": false,
  "message": "Authentication required"
}
```

Follow the existing API error response format if one already exists.

---

# Step 8 — Create Chart Layout Endpoint

Implement:

```text
POST /api/chart-layouts
```

Expected request body:

```json
{
  "name": "EURUSD Analysis",
  "symbol": "EURUSD",
  "timeframe": "4H",
  "layout": {
    "chartType": "candlestick",
    "theme": "dark",
    "indicators": [],
    "drawings": []
  }
}
```

Creation flow:

1. Authentication middleware verifies the user.
2. Validate required fields.
3. Validate the layout structure according to the flexible model requirements.
4. Get the authenticated user ID from the request.
5. Ignore any user ID sent by the client.
6. Create the chart layout.
7. Assign ownership from the authenticated user.
8. Save the layout.
9. Return the created layout.

The backend must never trust:

```text
req.body.user
req.body.userId
req.body.owner
```

for ownership.

Ownership must come from the authenticated request.

Recommended response:

```json
{
  "success": true,
  "message": "Chart layout created successfully",
  "data": {
    "layout": {
      "id": "LAYOUT_ID",
      "name": "EURUSD Analysis",
      "symbol": "EURUSD",
      "timeframe": "4H",
      "layout": {},
      "createdAt": "DATE",
      "updatedAt": "DATE"
    }
  }
}
```

Use the existing response format if the project already uses another consistent structure.

---

# Step 9 — Get All User Chart Layouts

Implement:

```text
GET /api/chart-layouts
```

This endpoint must return only layouts belonging to the authenticated user.

Conceptually:

```text
Find all ChartLayouts where:

ChartLayout.user === req.user.id
```

Do not implement:

```text
Find all chart layouts
```

because that could expose other users' data.

Recommended flow:

```text
Authenticated User
        ↓
req.user.id
        ↓
Find layouts owned by user
        ↓
Return only those layouts
```

The result should be sorted consistently.

Recommended default:

```text
Most recently updated first
```

Example response:

```json
{
  "success": true,
  "data": {
    "layouts": [],
    "count": 0
  }
}
```

The exact response format should follow existing project conventions.

An authenticated user with no saved layouts should receive a successful empty response.

Do not return an error simply because the user has no layouts.

---

# Step 10 — Get a Single Chart Layout

Implement:

```text
GET /api/chart-layouts/:id
```

This endpoint must enforce ownership.

The correct query logic is conceptually:

```text
Find ChartLayout where:

layout._id === req.params.id

AND

layout.user === req.user.id
```

Do not:

1. Find the layout only by ID.
2. Return it without checking ownership.

Incorrect:

```text
ChartLayout.findById(req.params.id)
```

Correct concept:

```text
Find by layout ID + authenticated user ownership
```

If the layout does not belong to the authenticated user:

- Do not return the layout.
- Do not expose its contents.

Use the project's preferred 403 or 404 strategy.

For security and resource privacy, returning 404 is often preferable because it does not confirm that another user's resource exists.

Follow the project's existing conventions.

---

# Step 11 — Update Chart Layout

Implement:

```text
PUT /api/chart-layouts/:id
```

The authenticated user must only be able to update their own layout.

Update flow:

1. Authenticate the user.
2. Validate the layout ID.
3. Find the layout using:
   - Layout ID
   - Authenticated user ownership

4. If no owned layout exists, return the appropriate error.
5. Validate allowed update fields.
6. Update the layout.
7. Save the changes.
8. Return the updated layout.

Allowed fields may include:

```text
name
symbol
timeframe
layout
```

Do not allow updating:

```text
user
userId
owner
createdAt
```

The owner of a chart layout must not be changeable through this endpoint.

Do not allow ownership transfer through request body manipulation.

---

# Step 12 — Update Strategy

Use a safe update strategy compatible with the existing ORM/database architecture.

Ensure validation still applies when updating.

For Mongoose, this may require update validation options.

Do not accidentally bypass validation by using an unsafe update method.

The updated layout should correctly update:

```text
updatedAt
```

if timestamps are enabled.

---

# Step 13 — Delete Chart Layout

Implement:

```text
DELETE /api/chart-layouts/:id
```

Deletion flow:

1. Authenticate the user.
2. Validate the layout ID.
3. Find the layout using:
   - Layout ID
   - Authenticated user ownership

4. If the layout is not owned by the user, do not delete it.
5. Delete the layout.
6. Return a success response.

Example:

```json
{
  "success": true,
  "message": "Chart layout deleted successfully"
}
```

Do not allow a user to delete another user's layout.

---

# Step 14 — Ownership Security

Ownership enforcement is the most important requirement of this milestone.

Every operation involving an individual chart layout must verify ownership.

Protected operations:

```text
GET single layout
UPDATE layout
DELETE layout
```

Required ownership concept:

```text
requested layout ID
        +
authenticated user ID
        ↓
Find owned layout
        ↓
Layout exists?
   ↙              ↘
 No                Yes
 ↓                  ↓
404/403          Continue operation
```

Do not rely on frontend restrictions.

Do not assume that because the UI hides another user's layout, the API is secure.

The backend must enforce ownership independently.

---

# Step 15 — Cross-User Security Testing

Explicitly test with two different users.

Example:

```text
User A
User B
```

Test:

### User A

```text
1. Register User A.
2. Login User A.
3. Create Layout A.
4. Save Layout A ID.
```

### User B

```text
1. Register User B.
2. Login User B.
3. Attempt GET /api/chart-layouts/LAYOUT_A_ID.
4. Attempt PUT /api/chart-layouts/LAYOUT_A_ID.
5. Attempt DELETE /api/chart-layouts/LAYOUT_A_ID.
```

Expected result:

```text
User B must not:

[ ] View User A's layout
[ ] Modify User A's layout
[ ] Delete User A's layout
```

Verify that Layout A still exists after User B's failed delete attempt.

This test is mandatory.

---

# Step 16 — Invalid ID Handling

Handle invalid or malformed layout IDs safely.

The server must not crash if a user sends:

```text
GET /api/chart-layouts/invalid-id
```

Return a controlled client error according to the project's error handling conventions.

Do not expose raw database or ORM errors.

---

# Step 17 — API Response Consistency

Follow the response conventions established in earlier milestones.

Recommended success pattern:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

Recommended error pattern:

```json
{
  "success": false,
  "message": "Error description"
}
```

Do not create a completely different response format for chart layouts if the rest of the API already follows a standard.

---

# Step 18 — Suggested Controller Structure

Use the existing controller architecture.

A typical controller may contain functions similar to:

```text
createChartLayout
getChartLayouts
getChartLayoutById
updateChartLayout
deleteChartLayout
```

The exact naming should match existing project conventions.

Keep controllers focused.

Avoid putting unrelated database or authentication configuration inside controllers.

Reuse:

- Authentication middleware
- Existing database connection
- Existing error handling
- Existing response helpers

where available.

---

# Step 19 — Suggested File Structure

Follow the existing project architecture.

A typical structure may look like:

```text
server/
├── controllers/
│   └── chartLayout.controller.js
│
├── models/
│   └── ChartLayout.js
│
├── routes/
│   └── chartLayout.routes.js
│
├── middleware/
│   └── auth.middleware.js
│
└── ...
```

Do not force this exact structure if the existing backend uses a different but consistent architecture.

Do not duplicate:

```text
User model
Authentication middleware
Database connection
Error middleware
```

---

# Step 20 — API Testing Checklist

Test every endpoint.

## Create Layout

```text
[ ] Authenticated user can create a layout
[ ] Missing name is rejected
[ ] Missing symbol is rejected
[ ] Missing timeframe is rejected
[ ] Missing layout configuration is handled according to validation rules
[ ] Layout is assigned to authenticated user
[ ] Client cannot spoof ownership with userId
[ ] Layout is stored successfully
```

---

## Get All Layouts

```text
[ ] Authenticated user can retrieve layouts
[ ] User only receives layouts they own
[ ] Empty layouts list returns successfully
[ ] Results are sorted consistently
[ ] Unauthenticated requests are rejected
```

---

## Get Single Layout

```text
[ ] Owner can retrieve layout
[ ] Another user cannot retrieve layout
[ ] Invalid layout ID is handled safely
[ ] Nonexistent layout returns controlled error
```

---

## Update Layout

```text
[ ] Owner can update layout
[ ] Owner can update allowed fields
[ ] Another user cannot update layout
[ ] user/userId cannot be changed
[ ] Invalid layout ID is handled safely
[ ] Validation still applies
[ ] updatedAt changes appropriately
```

---

## Delete Layout

```text
[ ] Owner can delete layout
[ ] Another user cannot delete layout
[ ] Deleted layout no longer appears in list
[ ] Invalid layout ID is handled safely
```

---

# Step 21 — Authentication Testing

Verify that all chart layout routes require authentication.

Test each route without a valid authentication cookie.

Expected:

```text
POST    /api/chart-layouts          → Unauthorized
GET     /api/chart-layouts          → Unauthorized
GET     /api/chart-layouts/:id      → Unauthorized
PUT     /api/chart-layouts/:id      → Unauthorized
DELETE  /api/chart-layouts/:id      → Unauthorized
```

Do not leave any route accidentally public.

---

# Step 22 — Server Integration Verification

After implementation:

1. Start the backend from the root project command.
2. Confirm the server starts successfully.
3. Confirm database connection still works.
4. Confirm authentication still works.
5. Confirm existing authentication routes still work.
6. Confirm chart layout routes are mounted correctly.
7. Confirm there are no module import errors.
8. Confirm there are no broken environment variable requirements.
9. Confirm existing functionality was not broken.
10. Confirm the root project scripts still work.

Do not change the root project architecture unnecessarily.

---

# Scope Restrictions

For this milestone, do NOT implement:

- Real-time candlestick data
- WebSocket chart streaming
- Deriv API integration
- Broker integration
- Trade execution
- Trading accounts
- Watchlists
- Portfolio calculations
- Technical indicator calculations
- Chart rendering
- Frontend chart UI
- Collaborative layouts
- Public/shared chart links
- Layout version history
- Undo/redo
- Payments
- Subscriptions

Focus only on persistent, authenticated, user-owned chart layouts.

---

# Definition of Done

Milestone 3 is complete only when all of the following are true:

```text
[ ] ChartLayout model is complete
[ ] Layout has a required user owner
[ ] Layout ownership comes from authentication
[ ] Client cannot spoof user ownership
[ ] POST /api/chart-layouts works
[ ] GET /api/chart-layouts works
[ ] GET /api/chart-layouts/:id works
[ ] PUT /api/chart-layouts/:id works
[ ] DELETE /api/chart-layouts/:id works
[ ] Every chart layout route is protected
[ ] Users only receive their own layouts
[ ] Users cannot view another user's layout
[ ] Users cannot update another user's layout
[ ] Users cannot delete another user's layout
[ ] Invalid IDs do not crash the server
[ ] Existing authentication still works
[ ] Existing backend functionality still works
[ ] Server starts successfully
[ ] Cross-user security testing has passed
[ ] All chart layout routes have been tested
```

---

# Final Agent Report

After implementation and testing, provide a concise report containing:

## 1. Files Created

List every new file.

## 2. Files Modified

List every modified file.

## 3. Model Structure

Briefly describe the final ChartLayout model.

## 4. Routes Implemented

List:

```text
POST    /api/chart-layouts
GET     /api/chart-layouts
GET     /api/chart-layouts/:id
PUT     /api/chart-layouts/:id
DELETE  /api/chart-layouts/:id
```

## 5. Ownership Security

Explain how the backend ensures:

```text
User A cannot access User B's chart layouts.
```

## 6. Test Results

Report the result of:

```text
Layout creation
Layout retrieval
Single layout retrieval
Layout update
Layout deletion
Unauthorized access
Cross-user access attempt
Invalid ID handling
Server startup
```

## 7. Problems Fixed

Mention any integration, routing, database, authentication, or startup issues discovered and fixed.

Do not claim the milestone is complete unless all required endpoints and security checks have actually been tested successfully.
