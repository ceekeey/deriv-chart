# Milestone 4 — Frontend Authentication

## Objective

Implement the frontend authentication foundation for the Chart application.

This milestone must connect the React frontend to the authentication backend completed in Milestone 2 and provide a professional authenticated application shell.

Users should be able to:

- Register an account
- Login
- Stay authenticated using HTTP-only cookie authentication
- Load the current authenticated user
- Logout
- Access protected pages
- Be redirected away from protected pages when unauthenticated
- Access the initial Dashboard after successful authentication

The frontend must use the Chart application's established visual design system.

---

# Required Technology

Use the existing frontend architecture and dependencies where possible.

The application should use:

```text
React
Vite
Tailwind CSS v4
React Router
Axios
Zustand
```

Before installing anything, inspect the existing `package.json` and frontend setup.

Do not reinstall or duplicate packages that already exist.

Do not unnecessarily change the Vite configuration.

Do not downgrade Tailwind.

The project uses Tailwind CSS v4.

Use:

```css
@import "tailwindcss";
```

Do not configure Tailwind using an outdated Tailwind v3 approach unless the existing project specifically requires compatibility.

---

# Important Instructions

Before writing code:

1. Inspect the existing repository.
2. Inspect the root package configuration.
3. Inspect the frontend directory structure.
4. Inspect the backend authentication API.
5. Confirm the authentication endpoints from Milestone 2.
6. Confirm the backend uses HTTP-only JWT cookies.
7. Confirm CORS and credentials are configured for frontend requests.
8. Reuse existing project conventions.
9. Do not unnecessarily restructure the application.
10. Do not implement broker APIs, real-time charts, trading logic, or chart data in this milestone.
11. Ensure the frontend runs successfully from the root project command.
12. Test the full authentication flow before declaring the milestone complete.

---

# Milestone Checklist

Implement and complete:

```text
[ ] Configure Tailwind CSS v4
[ ] Implement the Chart application color system
[ ] Configure React Router
[ ] Create Axios API client
[ ] Configure credential-based API requests
[ ] Create Zustand authentication store
[ ] Restore authentication on application load
[ ] Create Register page
[ ] Create Login page
[ ] Create ProtectedRoute component
[ ] Create Dashboard page
[ ] Implement logout
[ ] Test authentication flow
[ ] Verify root development scripts
```

---

# Step 1 — Tailwind CSS v4

Confirm Tailwind CSS v4 is configured correctly.

The main stylesheet should use:

```css
@import "tailwindcss";
```

Do not use an outdated Tailwind v3 initialization process.

Inspect the existing CSS before changing anything.

Preserve useful existing styles where appropriate.

---

# Step 2 — Chart Application Design System

The application must use the established Chart trading platform color scheme.

This is the official default theme for Milestone 4.

## Core Colors

```text
Background:       #0B1220
Surface:          #111827
Panel:            #172033
Border:           #263248

Primary:          #3B82F6
Primary Hover:    #60A5FA

Success / Buy:    #22C55E
Danger / Sell:    #EF4444
Warning:          #F59E0B

Text Primary:     #F8FAFC
Text Secondary:   #94A3B8
```

---

# Step 3 — Create Semantic Tailwind Theme Tokens

Do not scatter raw hex colors throughout every React component.

Create semantic theme tokens.

Recommended implementation using Tailwind CSS v4:

```css
@import "tailwindcss";

@theme {
  --color-app-bg: #0b1220;

  --color-surface: #111827;
  --color-panel: #172033;
  --color-border: #263248;

  --color-primary: #3b82f6;
  --color-primary-hover: #60a5fa;

  --color-success: #22c55e;
  --color-danger: #ef4444;
  --color-warning: #f59e0b;

  --color-text-primary: #f8fafc;
  --color-text-secondary: #94a3b8;
}
```

The agent may improve token naming to match the existing project architecture, but the actual visual palette should remain consistent.

The goal is to allow usage such as:

```text
bg-app-bg
bg-surface
bg-panel
border-border

text-text-primary
text-text-secondary

bg-primary
hover:bg-primary-hover

text-success
text-danger
text-warning
```

Avoid randomly mixing blue, purple, green, and other unrelated accent colors.

The trading colors have semantic meaning:

```text
Green = Buy / Positive / Success
Red = Sell / Negative / Error
Orange = Warning
Blue = Main Application Interaction
```

---

# Step 4 — Global Styling

Create a clean global application foundation.

The default application should:

```text
Use dark mode as the default appearance
Use #0B1220 as the main application background
Use #F8FAFC for primary text
Use #94A3B8 for secondary text
Use subtle #263248 borders
Avoid heavy gradients
Avoid excessive shadows
Avoid excessive rounded cards
```

The visual direction should feel like:

```text
Modern trading platform
Professional fintech dashboard
Clean developer tool
Trading terminal
```

It should not feel like:

```text
Gaming dashboard
Crypto scam landing page
Overly neon UI
Generic colorful admin dashboard
```

---

# Step 5 — Recommended Frontend Structure

Follow the existing project structure.

A typical structure may be:

```text
src/
├── api/
│   └── axios.js
│
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.jsx
│   │
│   └── common/
│       ├── Button.jsx
│       ├── Input.jsx
│       └── ...
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Dashboard.jsx
│
├── store/
│   └── auth.store.js
│
├── App.jsx
├── main.jsx
└── index.css
```

Do not force this structure if the project already uses a clean alternative.

Avoid creating unnecessary files.

---

# Step 6 — Configure React Router

Configure React Router using the version already installed or appropriate for the project.

Required routes:

```text
/             → Application entry route
/login        → Login page
/register     → Register page
/dashboard    → Protected Dashboard
```

Recommended behavior:

```text
/               → Redirect based on authentication state

Authenticated   → /dashboard
Unauthenticated → /login
```

Protected routes must not be accessible when the user is unauthenticated.

---

# Step 7 — Axios API Client

Create a centralized Axios API client.

Recommended location:

```text
src/api/axios.js
```

The API client should:

1. Use the backend API base URL.
2. Read the base URL from environment configuration where appropriate.
3. Enable credentials.
4. Send HTTP-only cookies automatically.
5. Provide a reusable Axios instance.

The critical Axios setting is:

```js
withCredentials: true;
```

The frontend must not attempt to manually read the JWT.

The frontend must not:

```text
Read JWT from cookies
Store JWT in localStorage
Store JWT in sessionStorage
Manually attach JWT Authorization headers
```

Authentication is handled by HTTP-only cookies.

---

# Step 8 — Environment Configuration

Use a frontend environment variable for the API URL.

For example:

```text
VITE_API_URL
```

Do not hardcode the backend URL throughout components.

The Axios client should be the central location responsible for API configuration.

If `.env.example` exists, update it.

Do not expose secrets in frontend environment variables.

---

# Step 9 — Axios Error Handling

Implement a consistent approach for API errors.

The frontend should correctly handle:

```text
400 → Validation errors
401 → Authentication required / invalid authentication
403 → Forbidden
404 → Resource not found
500 → Server errors
Network errors
```

Do not show raw Axios error objects to users.

Extract useful backend messages where available.

Use a safe fallback message when the backend does not provide one.

---

# Step 10 — Zustand Authentication Store

Create a centralized authentication store.

Recommended location:

```text
src/store/auth.store.js
```

The store should manage at minimum:

```text
user
isAuthenticated
isLoading
error
```

Recommended actions:

```text
register()
login()
logout()
fetchCurrentUser()
clearError()
```

The exact function names may follow project conventions.

---

# Step 11 — Authentication Store Behavior

The store should communicate with the backend API.

## Register

Call:

```text
POST /api/auth/register
```

After successful registration:

1. Backend creates the user.
2. Backend sets HTTP-only JWT cookie.
3. Frontend receives safe user data.
4. Zustand stores the authenticated user.
5. `isAuthenticated` becomes true.
6. Redirect user to `/dashboard`.

---

## Login

Call:

```text
POST /api/auth/login
```

After successful login:

1. Backend verifies credentials.
2. Backend sets HTTP-only JWT cookie.
3. Frontend stores returned safe user data.
4. `isAuthenticated` becomes true.
5. Redirect to `/dashboard`.

---

## Logout

Call:

```text
POST /api/auth/logout
```

After successful logout:

1. Backend clears the authentication cookie.
2. Frontend clears the Zustand user state.
3. `isAuthenticated` becomes false.
4. Redirect to `/login`.

The frontend should clear authentication state even when appropriate fallback handling is required after logout errors.

Do not leave stale authenticated UI after logout.

---

# Step 12 — Restore Authentication on Application Load

When the application starts, the frontend should check whether the user is already authenticated.

Call:

```text
GET /api/auth/me
```

Flow:

```text
Application Starts
        ↓
isLoading = true
        ↓
GET /api/auth/me
        ↓
Authenticated?
   ↙              ↘
 YES              NO
  ↓                ↓
Store User       Clear User
  ↓                ↓
Dashboard       Login Access
```

This prevents the application from forgetting the user after a page refresh.

Because the JWT is stored in an HTTP-only cookie, the frontend determines authentication by calling `/api/auth/me`.

Do not attempt to inspect the JWT directly.

---

# Step 13 — Loading State

While authentication is being restored, protected routes must not immediately redirect users to login.

Avoid this broken flow:

```text
Page Refresh
    ↓
User state temporarily empty
    ↓
Immediately redirect to login
    ↓
/me request finishes later
```

Instead:

```text
Application Starts
    ↓
Authentication Loading
    ↓
GET /api/auth/me
    ↓
Loading Complete
    ↓
Render correct route
```

Create a simple professional loading state.

It should use the established color scheme.

Example visual direction:

```text
Dark background
Small loading indicator
Blue accent
"Loading your workspace..."
```

Do not make the loading screen overly animated.

---

# Step 14 — Register Page

Create:

```text
/register
```

Required fields:

```text
Username
Email
Password
```

Recommended UI:

```text
Chart logo / app name

Create your account
Start building your trading workspace.

Username input
Email input
Password input

Create Account button

Already have an account?
Login
```

Design requirements:

```text
Background: #0B1220
Form Surface: #111827 or #172033
Border: #263248
Primary Button: #3B82F6
Hover: #60A5FA
Primary Text: #F8FAFC
Secondary Text: #94A3B8
```

The design should be responsive.

Do not make the form excessively wide.

Use proper:

```text
Labels
Focus states
Disabled state
Loading state
Validation feedback
```

---

# Step 15 — Login Page

Create:

```text
/login
```

Required fields:

```text
Email
Password
```

Recommended UI:

```text
Chart logo / app name

Welcome back

Sign in to continue to your trading workspace.

Email input
Password input

Login button

Don't have an account?
Create Account
```

Use the same visual design system as the Register page.

The Login and Register pages should feel like parts of the same application.

---

# Step 16 — Authentication Form Behavior

Both forms must:

```text
Prevent duplicate submissions
Show loading state during API requests
Disable submit button while submitting
Display validation errors
Display backend errors
Clear stale errors when appropriate
Handle network failures
```

Do not use browser alert dialogs as the main error handling UI.

Use inline or component-level error messages.

---

# Step 17 — ProtectedRoute Component

Create a reusable `ProtectedRoute` component.

Its job:

```text
If authentication is loading
        ↓
Show loading state

If user is authenticated
        ↓
Render protected content

If user is not authenticated
        ↓
Redirect to /login
```

The component must work with nested routes or route wrappers according to the React Router architecture being used.

Do not duplicate authentication logic inside every protected page.

Use the reusable component.

---

# Step 18 — Guest Route Behavior

Authenticated users should generally not remain on:

```text
/login
/register
```

Recommended behavior:

```text
Authenticated user visits /login
        ↓
Redirect to /dashboard
```

and:

```text
Authenticated user visits /register
        ↓
Redirect to /dashboard
```

Implement a reusable approach if appropriate.

Do not create unnecessary complexity.

---

# Step 19 — Dashboard Page

Create:

```text
/dashboard
```

The Dashboard is the initial authenticated application landing page.

This milestone does not require a full trading dashboard.

Create a clean application shell that confirms authentication is working.

Recommended content:

```text
Top Navigation

Chart App branding

Dashboard

Welcome, {username}

Authentication is working successfully.

Logout button
```

Optional placeholder sections:

```text
Recent layouts
Saved charts
Market overview
```

These must clearly be placeholders.

Do not implement real chart functionality in this milestone.

---

# Step 20 — Dashboard Visual Design

The Dashboard must use the established Chart theme.

Recommended structure:

```text
┌──────────────────────────────────────────────┐
│ Logo       Dashboard              User Menu  │
├──────────────────────────────────────────────┤
│                                              │
│ Dashboard                                    │
│ Welcome back, Username                       │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ Authentication Connected                │ │
│ │ Your Chart workspace is ready.          │ │
│ └──────────────────────────────────────────┘ │
│                                              │
└──────────────────────────────────────────────┘
```

Use:

```text
Main background → #0B1220
Navigation → #111827
Panels → #172033
Borders → #263248
Interactive blue → #3B82F6
Hover blue → #60A5FA
Primary text → #F8FAFC
Secondary text → #94A3B8
```

Do not introduce unrelated accent colors.

---

# Step 21 — Responsive Design

The frontend must work on:

```text
Desktop
Tablet
Mobile
```

Authentication pages should remain usable on small screens.

Dashboard navigation should not overflow.

Forms should remain accessible.

Do not optimize only for desktop.

---

# Step 22 — Accessibility Basics

Ensure:

```text
Inputs have labels
Buttons are keyboard accessible
Focus states are visible
Color is not the only indicator of errors
Text contrast remains readable
Disabled buttons are visually distinguishable
```

Use semantic HTML where practical.

---

# Step 23 — API Contract Verification

Before finalizing, verify the frontend matches the actual backend routes and response structure from Milestone 2.

Confirm:

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

Do not guess response fields.

Inspect the backend implementation.

Ensure the Zustand store correctly reads the actual API response.

For example, if the backend returns:

```json
{
  "success": true,
  "data": {
    "user": {}
  }
}
```

the frontend should correctly access:

```text
response.data.data.user
```

or whatever the actual backend structure is.

---

# Step 24 — Full Authentication Flow Testing

Test the complete flow.

## Registration

```text
[ ] Open /register
[ ] Enter valid information
[ ] Submit registration
[ ] User is created
[ ] Authentication cookie is set
[ ] Zustand user state updates
[ ] User redirects to /dashboard
```

---

## Login

```text
[ ] Open /login
[ ] Enter valid credentials
[ ] Submit login
[ ] Authentication succeeds
[ ] Authentication cookie is set
[ ] Zustand user state updates
[ ] User redirects to /dashboard
```

---

## Invalid Login

```text
[ ] Wrong password shows useful error
[ ] Invalid email shows useful error
[ ] Form does not crash
[ ] Password is not exposed
```

---

## Page Refresh

```text
[ ] Login successfully
[ ] Refresh browser
[ ] GET /api/auth/me is called
[ ] User remains authenticated
[ ] Dashboard remains accessible
```

---

## Protected Route

```text
[ ] Logout
[ ] Attempt to visit /dashboard
[ ] User is redirected to /login
```

---

## Guest Route

```text
[ ] Login successfully
[ ] Attempt to visit /login
[ ] Redirect to /dashboard
```

Test `/register` as well.

---

## Logout

```text
[ ] Click logout
[ ] Backend logout endpoint is called
[ ] Cookie is cleared
[ ] Zustand state is cleared
[ ] User redirects to /login
[ ] Dashboard is no longer accessible
```

---

# Step 25 — Server and Frontend Integration

Verify both applications work together.

Confirm:

```text
Frontend starts successfully
Backend starts successfully
Registration request succeeds
Login request succeeds
Cookies are sent correctly
Credentials are included
/me works
Logout works
Protected routes work
No CORS credential errors occur
```

If a CORS issue is discovered, fix the configuration without weakening security unnecessarily.

Do not use:

```text
origin: *
```

with credential-based cookies.

---

# Scope Restrictions

Do not implement during this milestone:

```text
Real-time charts
Candlestick rendering
WebSockets
Deriv API integration
Broker APIs
Trade execution
Watchlists
Technical indicators
Portfolio calculations
Trading bots
Payments
Subscriptions
Password reset
Email verification
OAuth
Two-factor authentication
```

This milestone is only responsible for the frontend authentication foundation and initial authenticated application shell.

---

# Definition of Done

Milestone 4 is complete only when:

```text
[ ] Tailwind CSS v4 works
[ ] The official Chart color system is implemented
[ ] Semantic color tokens are used
[ ] React Router works
[ ] Axios API client works
[ ] Axios uses withCredentials
[ ] API URL is configurable
[ ] Zustand auth store works
[ ] Authentication is restored with /api/auth/me
[ ] Register page works
[ ] Login page works
[ ] Loading states work
[ ] Error states work
[ ] ProtectedRoute works
[ ] Guest routes redirect authenticated users
[ ] Dashboard works
[ ] Logout works
[ ] Page refresh preserves authentication
[ ] HTTP-only cookie authentication works
[ ] No JWT is stored in localStorage
[ ] No sensitive JWT handling occurs in frontend code
[ ] UI uses the established color scheme
[ ] UI is responsive
[ ] Existing backend functionality still works
[ ] Frontend starts successfully
[ ] Root development scripts work
[ ] Full authentication flow has been tested
```

---

# Final Agent Report

After implementation and testing, provide:

## 1. Files Created

List every new file.

## 2. Files Modified

List every modified file.

## 3. Dependencies Added

List any new dependencies.

Do not list dependencies that were already installed.

## 4. Routes Implemented

List frontend routes.

## 5. Authentication Flow

Explain:

```text
Register/Login
        ↓
Backend HTTP-only JWT Cookie
        ↓
Axios withCredentials
        ↓
Zustand User State
        ↓
Protected Routes
        ↓
Dashboard
```

## 6. Theme Implementation

Confirm the semantic color tokens and that the application uses:

```text
#0B1220
#111827
#172033
#263248
#3B82F6
#60A5FA
#22C55E
#EF4444
#F59E0B
#F8FAFC
#94A3B8
```

## 7. Test Results

Report results for:

```text
Registration
Login
Invalid Login
Authentication Restore
Protected Routes
Guest Routes
Logout
Page Refresh
Frontend Startup
Backend Integration
CORS/Credentials
```

## 8. Problems Fixed

Mention any:

```text
CORS issues
Cookie issues
API URL issues
Route issues
Authentication state issues
Startup issues
```

Do not declare Milestone 4 complete unless the full frontend and backend authentication flow has been tested successfully.
