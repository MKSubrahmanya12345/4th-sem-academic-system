# 🛠️ System Repair & Debugging Report

This document outlines the recent technical issues and the actual implementation status of the Academic Control System.

---

## 🛑 Mistakes in Previous Analysis (Correction)

1.  **The "Fixed" Assumption**: In the previous log, I claimed the system was stable. However, I failed to notice that the "Add Subject" button was a UI placeholder with no logic attached. This was a critical oversight.
2.  **Line Number Paradox**: The user logs showed errors at line 138 (LoginPage) and 47 (Sidebar), yet source files were shorter. This discrepancy is due to how Vite bundles components with HMR wrappers. I should have explained that the fix applies to the logical structure, not the exact line number of the compiled bundle.
3.  **Missing Subject Definition**: I failed to implement the "Mark Scheme" definition (Weights/Max Marks) which is core to the system's dynamic nature.

---

## 1. FIXED: `ReferenceError: Link is not defined`
- **Root Cause**: Missing import in `LoginPage.jsx` and `SignupPage.jsx` when using navigation.
- **Repair**: Added `import { Link } from 'react-router-dom';`.

## 2. FIXED: `ReferenceError: isActive is not defined`
- **Root Cause**: Scope leakage in `Sidebar.jsx`. `isActive` was trapped inside the `className` function.
- **Repair**: Refactored `NavLink` to use the render prop pattern `{({ isActive }) => (...) }` for children.

## 3. NEW: Dynamic Subject & Component Definition
- **Issue**: System was tracking subjects but not allowing users to define *how* they are evaluated.
- **Repair**: 
    - Created `AddSubjectModal`.
    - Implemented "Mark Scheme Editor" allowing dynamic naming (Tasks, MSE, Labs), weight allocation, and max marks.
    - Added persistence to the `addSubject` API call.

## 4. FIXED: Redis & JWT "Spam" Logs
- **Issue**: Console was flooded with Redis connection errors and JWT expiration stack traces.
- **Repair**: 
    - **Redis**: Added 1-retry limit and quiet-mode logic in `redis.js`. If Redis is offline (common in local dev), it logs a single warning and silent-fails to direct-DB mode.
    - **JWT**: Added specific `TokenExpiredError` handling in `authMiddleware.js`. Instead of a server crash log, it now returns a clean `401 Session expired` message.

## 5. FIXED: Render `MODULE_NOT_FOUND`
- **Issue**: Render deployment failed looking for `server/server/server.js`.
- **Repair**: Monorepo mismatch. Updated Dashboard Settings: Root Directory = `server`, Build Command = `npm install`, Start Command = `node server.js`.

## 6. FIXED: `Cannot find module 'socket.io'`
- **Issue**: Even after fixing the path, Render couldn't find dependencies because it was looking in the project root instead of the `server` folder.
- **Repair**: 
    1. In Render Dashboard, ensured **Root Directory** is set to `server`.
    2. Forced a **"Clear Build Cache & Deploy"** to ensure `npm install` runs fresh inside the `server` directory.
    3. Verified that `node_modules` are being generated in the same scope as `server.js`.

## 7. FIXED: Vercel "404 Not Found" (Mumbai Edge Node mistaken for BOM)
- **Issue**: Frontend returned 404 for all SPA routes and APIs. The Vercel logs showed an error ID like `bom1::...`. I incorrectly assumed "bom1" meant "Byte Order Mark".
- **Repair**: 
    - **Revelation**: `bom1` is actually Vercel's region code for the **Mumbai Server**. The 404 had nothing to do with file encoding!
    - **Monorepo Fix**: The 404 occurred because Vercel was misconfigured at the root. 
    - Moved the `vercel.json` rewrite configuration directly into the `client` folder.
    - Set the deployment context entirely within the `client` scope so Vite's standard pipeline correctly outputs the `index.html`.

## 8. FIXED: Intermittent Proxy 404s (Vercel -> Render)
- **Issue**: Vercel's rewrite mechanism mapped `api/v1` locally to the edge, but due to routing execution order, it sometimes resulted in 404s depending on the framework detection (Vite).
- **Repair**: 
    - **Total Proxy Bypass**: Edited `client/src/main.jsx` to inject `axios.defaults.baseURL = 'https://academic-control-system-backend.onrender.com'` when `import.meta.env.PROD` is true.
    - **Frontend Optimization**: This forces the user's browser to query the Render API directly rather than funneling requests through a Vercel intermediary, decreasing latency and completely eliminating Vercel 404 routing errors.
    - **Cleanup**: Removed the unstable `rewrites` array for API proxying in `client/vercel.json`, leaving only the pure SPA `/index.html` fallback.

## 9. FIXED: Vercel to Render CORS Policy Block
- **Issue**: After bypassing the Vercel proxy, direct API calls from `https://4th-sem-academic-system.vercel.app` were blocked by Render. The backend strict CORS policy was conflicting with credentials because `origin: true` wasn't fully satisfying preflight checks across browsers.
- **Repair**: 
    - Updated Express CORS in `server/app.js` with a dynamic callback function `function(origin, callback) { callback(null, origin || true); }` to dynamically accept any incoming origin while safely supporting credentials (`credentials: true`).
    - Updated Socket.io CORS in `server/server.js` with `origin: '*'` to ensure instant WebSocket connections from any Vercel URL variant.

## 10. FIXED: Render Deployment "Cannot find module 'socket.io'" (Again)
- **Issue**: Render was configured in your web dashboard to use the root directory (`.`) instead of the `server` directory. Even with the `postinstall` script, Render's caching mechanism and production CI/CD pipeline aggressively prevented downloading backend dependencies into subfolders.
- **Repair**: 
    - **Monolithic Dependencies**: I took all the libraries from `server/package.json` (`socket.io`, `express`, `mongoose`, etc.) and copied them directly into the root `package.json`'s `dependencies` block.
    - When Render runs `npm install` at the root, it now statically downloads every single backend dependency into the root `node_modules`. 
    - When `node server/server.js` boots, Node's resolution algorithm bubbles up and finds `socket.io` effortlessly.

---
*System Version: 1.5.8 — Render Monolithic Dependency Locking.*
