## LinkSwinger — Copilot instructions

Target: help an AI coding assistant immediately be productive in this Nuxt 3 + Pinia codebase.

- Big picture
  - This is a Nuxt 3 application (see `nuxt.config.js`) with SSR enabled and Pinia used for state.
  - Runtime API base URLs come from runtime config public keys: `API_BASE_URL` / `LOCAL_API_BASE_URL`.
  - Real-time chat uses a dedicated WebSocket endpoint `wss://linkswingers.co.uk/websocket` and a shared worker pattern (see `composables/websockets.ts` and `workers/shared-worker.ts`).

- Key locations (read these first)
  - `nuxt.config.js` — framework, modules (`@pinia/nuxt`), css and plugin setup
  - `package.json` — dev/start/build scripts: `npm run dev`, `npm run build`, `npm run preview`
  - `composables/models.ts` — canonical TypeScript models used across the app; prefer these types when creating requests/responses
  - `composables/websockets.ts` — websocket lifecycle, reconnect logic, and message handling
  - `store/appstores.ts` — Pinia stores and cookie-backed persistence patterns (use `useCookie` + getters/actions)
  - `workers/shared-worker.ts` and `sendmsgtoworker` usages — worker-based message bus between composables/components and the socket
  - `components/chat/chat-content.vue` — representative component showing event-bus usage (`useMittEmitter`), how chat messages are composed and how `ChatEventSocketModel` instances are produced and sent

- Project-specific conventions & patterns
  - Types live in `composables/models.ts` and are widely reused; always reference them for shape and default values.
  - Communication flow for real-time events: component -> create Model (from `models.ts`) -> `sendmsgtoworker(model, true)` -> worker -> websocket. See `chat-content.vue` and `websockets.ts` for both ends.
  - Stores use Pinia and rely on `useCookie` for persistence. Getter names follow `getXxx` (e.g., `getDeviceId`). Prefer store actions for mutations.
  - Use `useRuntimeConfig().public` for base URLs instead of hard-coding endpoints.
  - Event names are string literals on models (e.g., `event_name = 'chat'`, `'chat_sent'`, `'server_date'`); match these exact strings when producing or handling events.

- How to run & debug (concrete)
  - Install: `npm install` (or `yarn install`).
  - Dev server: `npm run dev` — Nuxt development mode (port 3000 by default).
  - Build: `npm run build` and `npm run preview` to run the production build locally.
  - If changing Pinia stores, watch cookies via `useCookie` for persisted defaults and clear cookies if state seems stale.
  - To inspect websockets locally, see `composables/websockets.ts`. The socket is opened with a query param `?socketId=${socketId}` — ensure `idStore` has a device id when testing.

- Safe, high-value edits an AI can make autonomously
  - Add or update type annotations using interfaces from `composables/models.ts`.
  - Small refactors that preserve public behavior: extract duplicated CSS classes into component-level style blocks, rename internal variables for clarity, tidy event handlers while keeping event_name strings intact.
  - Implement missing null-checks around `useCookie` / store getters to avoid runtime undefined errors.

- Things not to change without human review
  - WebSocket protocols, `event_name` strings, and message model shapes — changing these silently breaks runtime integration with the shared worker and server.
  - Production runtime config keys or base URLs in `nuxt.config.js`.
  - Any DB or external API contract assumptions (refer to `composables/models.ts` before modifying request/response shapes).

- Quick examples (copyable patterns)
  - Send a chat message from a component:
    1. import/create `ChatEventSocketModel` from `composables/models.ts`
    2. set `event_name = 'chat'`, `from_id`, `to_id`, `message_type`, `message`
    3. call `sendmsgtoworker(eventModel, true)`

  - Read base API URL:
    const runtime = useRuntimeConfig();
    const url = runtime.public.API_BASE_URL + '/fetchFeeds'

- Files to reference when authoring code or PRs
  - `nuxt.config.js`, `package.json`, `composables/models.ts`, `composables/websockets.ts`, `workers/shared-worker.ts`, `store/appstores.ts`, `components/chat/chat-content.vue`

If anything above is unclear or you'd like me to expand any section (e.g., wire up a small example change or add tests), tell me which area to iterate on.
