#!/usr/bin/env node
/**
 * Render entrypoint shim.
 *
 * Render services default to running `node server.js` from the repository root,
 * but this repo's API lives in `backend-api/` (see `render.yaml`, which sets
 * `rootDir: backend-api` for Blueprint deploys). A service created by hand —
 * with no Root Directory, or one pointing at the repo root — crashed with:
 *
 *   Error: Cannot find module '/opt/render/project/src/server.js'
 *
 * This shim keeps both setups working. The preferred fix is still to make the
 * repo shape explicit in the dashboard: Render → Settings → Root Directory =
 * `backend-api` (start command `npm start`). With that set, this file is unused.
 *
 * Note the module systems: the root `package.json` is `"type": "module"`, so
 * this file is ESM and must `import`; `backend-api/package.json` is CommonJS,
 * so the real server still uses `require`. Node handles that CJS-from-ESM
 * import natively, and `backend-api/server.js` is dependency-free (Node core
 * only), so there is nothing extra to install.
 */
import "./backend-api/server.js";
