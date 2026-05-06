# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Run both server and client concurrently (development)
npm run dev

# Server only (nodemon, hot reload)
npm run server

# Client only (React dev server, port 3000)
npm run client

# Production start
npm start

# Run frontend tests
npm test --prefix client

# Build client for production
npm run build --prefix client
```

## Architecture

MERN stack contact manager. Express backend on port 5000, Create React App frontend on port 3000. In development, the client proxies `/api/*` requests to the backend (configured in `client/package.json`). In production, Express serves the built React app from `/client/build` and handles all routes.

### Backend

- **Entry point:** `server.js` — mounts routes, connects DB, serves static files in production
- **Config:** `config/default.json` — holds `mongoURI` and `jwtSecret` (used via the `config` npm package)
- **Auth flow:** `POST /api/users` registers, `POST /api/auth` logs in, both return a JWT. `GET /api/auth` loads the current user from the token. The `middleware/auth.js` middleware verifies the JWT on protected routes and injects `req.user`.
- **Contacts:** `routes/contacts.js` exposes full CRUD at `/api/contacts`. All endpoints are protected; contacts are scoped to `req.user.id` so users only see their own.

### Frontend

State is managed entirely with React Context + `useReducer` — no Redux. There are three context providers wrapping the app (in `App.js`): `AuthState`, `ContactState`, and `AlertState`.

- **Auth context** (`context/contact/auth/`) — stores token in `localStorage`, calls `setAuthToken` (an axios default header helper in `utils/`) on load and login/logout
- **Contact context** (`context/contact/`) — holds contacts array, current (edit target), and filtered results
- **Routing:** `components/routing/PrivateRoute.js` redirects unauthenticated users to `/login`

The context folder structure is slightly non-standard: auth files live inside `context/contact/auth/` rather than `context/auth/`.
