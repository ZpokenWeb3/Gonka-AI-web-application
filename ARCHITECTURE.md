## Architecture

### Backend

- **Stack**: Node.js, Express, Prisma, PostgreSQL, JWT, custom AES‑256‑GCM encryption.
- **Entry point**: `apps/backend/src/server.ts`
  - Connects to the database via `config/database.ts`.
  - Creates the Express app with `createApp` from `src/app.ts`.
  - Starts the HTTP server on the port from `config/env.ts`.

#### Application setup

- `src/app.ts`
  - Initializes `express()` and global middleware:
    - `helmet()` for basic security headers.
    - `cors()` with `origin` taken from `process.env.FRONTEND_URL` (or `*` as a fallback) and `credentials: true`.
    - `express.json()` for JSON body parsing.
    - Custom logging middleware that measures request duration and logs `[METHOD] path - status - duration ms`.
  - Exposes a `/health` endpoint for simple health checks.
  - Mounts the main router from `src/routes/index.ts`.

#### Routing, controllers, services

- `src/routes/index.ts`
  - Composes feature routers:
    - `/auth` → authentication routes.
    - `/api/gonka` → routes that proxy/coordinate with the Gonka API.
    - `/chats` → chat session and messaging routes.
    - `/messages` → message‑level operations.
    - `/developer` → developer API key and related routes.
- Layering:
  - **Routes**: define URL structure and HTTP methods, wire up middlewares and controllers.
  - **Controllers** (`src/controllers/*`): handle HTTP input/output (validation, status codes, response shapes).
  - **Services** (`src/services/*`): implement business logic, orchestrate database access and Gonka API calls.

#### Database and Prisma

- `src/config/database.ts`
  - Exposes a single `PrismaClient` instance configured with:
    - `datasources.db.url` from `process.env.DATABASE_URL`.
    - Logging of queries, errors and warnings.
  - Provides helper functions to connect and disconnect on application start/shutdown.
- `prisma/schema.prisma`
  - Defines the relational data model used by the backend (users, chats, messages, API keys, etc.).
  - Migrations are stored under `apps/backend/prisma/migrations/*` and applied via `prisma migrate`.

#### Authentication and JWT

- Wallet‑based authentication:
  - The backend exposes auth endpoints (under `/auth`) to:
    - Generate a nonce for a wallet address.
    - Verify a signed message from the wallet.
  - On successful verification, a JWT is issued and usually stored in a cookie on the frontend.
- `src/utils/jwt.ts`
  - Uses `JWT_SECRET` from environment variables (with a development fallback) to:
    - `signToken(payload)` — create JWT tokens with a default lifetime (e.g. 7 days).
    - `verifyToken(token)` — verify and decode tokens.
- `src/middlewares/auth.middleware.ts` (not detailed here)
  - Reads the JWT from the request (header/cookie).
  - Verifies the token and attaches the authenticated user context to the request object.
  - Protects routes that require authentication.

#### Encryption and secrets

- `src/utils/encryption.ts`
  - Uses AES‑256‑GCM for encrypting sensitive values.
  - `ENCRYPTION_KEY` is loaded from `process.env.ENCRYPTION_KEY` and must be exactly 64 hex characters (32‑byte key).
  - Provides:
    - `encrypt(text)` → returns base64‑encoded ciphertext and nonce.
    - `decrypt(ciphertextB64, nonceB64)` → restores original plaintext.
    - `computeContentHash(content)` and `verifyContentIntegrity(content, storedHash)` for integrity checks using SHA‑256.
- Sensitive data such as secrets or API keys can be stored encrypted at rest in the database, and decrypted only at the moment of use in services.

#### Gonka API integration

- `src/services/gonka.service.ts`
  - Lazily imports the `gonka-openai` SDK at runtime.
  - Resolves dynamic endpoints based on `GONKA_SOURCE_URL` and caches them.
  - Instantiates a `GonkaOpenAI` client using:
    - `GONKA_SOURCE_URL` (as API base).
    - `GONKA_PRIVATE_KEY` (for authentication).
  - Exposes:
    - `gonkaChat(message, model?)` — sends a chat completion request to a selected LLM.
    - `gonkaGetEndpoints()` — returns resolved endpoints information.

---

### Frontend

- **Stack**: Next.js App Router, React, TypeScript, Tailwind, Zustand, React Query, Wagmi/RainbowKit, Axios.
- Lives in `apps/web`.

#### App shell and layout

- `app/layout.tsx`
  - Defines the HTML skeleton and global layout:
    - Imports global styles and polyfills.
    - Wraps the application in dynamic `Providers` (client‑side only).
    - Renders persistent UI elements:
      - `Navbar` (sidebar navigation).
      - `Header` (top bar).
      - `Transition` wrapper for page transitions/animations.
    - Renders the `Toaster` component for notifications (`sonner`).
- `app/providers.tsx`
  - Sets up global client‑side providers:
    - React Query client.
    - Wagmi + RainbowKit for wallet connections.
    - Custom Gonka provider and any shared context required by the app.

#### Routing and pages

- Located in `apps/web/app/*`:
  - `/` — main landing/dashboard.
  - `/chat` and `/chat/[id]` — chat selection and active chat view.
  - `/account` — account summary, current balance, basic info.
  - `/analytics` — usage statistics and charts.
  - `/developer-api` — developer API keys management and documentation snippets.
  - `/deposit` — deposit/top‑up flows and transaction history.
  - `/withdraw` — withdrawal flows and transaction summary.
  - `/bridge` — UI for future bridge/swap functionality.
  - `/settings` — user and application settings.

Each page composes feature‑specific components from `components/*`.

#### Components and UI

- `components/*` is organized by domain:
  - `components/chat/*` — chat UI (messages, input, chat list, model selection, quick preview).
  - `components/account/*` — account info and usage stats.
  - `components/analytics/*` — charts and summary blocks for analytics.
  - `components/deposit/*` and `components/withdraw/*` — deposit/withdrawal cards, forms and history blocks.
  - `components/developer/*` — API key creation and management UI.
  - `components/settings/*` — settings sections and skeletons.
  - `components/ui/*` — shared primitives such as `button`, `modal`, `switcher`, `section-title`, `skeleton`, etc.
- Shared UI primitives that may also be reused outside the app live in `packages/ui` (e.g. reusable `button`, `card`, `code` components).

#### State management and data fetching

- **Zustand store** (`apps/web/store/useChatStore.ts`)
  - Holds chat‑related state:
    - `chats` and `currentChat`.
    - `messages` list for the active chat.
    - loading/error flags and an `isActive` flag.
  - Provides actions to:
    - Load, create, select and delete chats (via `lib/chat` API helpers).
    - Append user and assistant messages.
    - Clear messages and toggle active status.
- **Hooks** (`apps/web/hooks/*`)
  - Encapsulate domain‑specific logic for:
    - Authentication (`useAuth`).
    - Chats (`useChats`).
    - Developer API (`useDeveloperApi`).
    - Gonka balance and price (`useGonkaBalance`, `useGonkaPrice`).
    - Model selection (`useModelSelection`).
    - Profile info (`useProfile`).
- **Data fetching**
  - Centralized in `apps/web/lib/*`:
    - `auth.ts` — auth‑related calls, cookie name, helpers.
    - `gonkaClient.ts` — low‑level Axios client for sending chat messages.
    - `chat.ts`, `developer-api.ts`, `gonkaClient.ts` — higher‑level helpers for corresponding back‑end routes.
  - Uses `NEXT_PUBLIC_API_BASE_URL` (with a default of `http://localhost:5000`) to reach the backend.
  - React Query is used (via providers) for caching and background refetching in hooks/components.

#### Authentication flow (frontend)

- Wallet connection is initiated from the UI using Wagmi/RainbowKit components.
- After connecting, the app:
  - Requests a nonce from the backend.
  - Asks the wallet to sign a message containing the nonce.
  - Sends the signed message back to the backend for verification.
- On success, the backend returns a JWT, typically stored in a `gonka_token` cookie.
- `apps/web/lib/gonkaClient.ts` and other API helpers:
  - Read the `gonka_token` cookie on the client.
  - Attach it as a `Bearer` token in the `Authorization` header when calling backend endpoints.

---

### Security and data flow (high level)

1. **User opens the web app**
  - Next.js serves the UI, sets up providers and wallet connection.
2. **Authentication**
  - The user connects a wallet and signs a backend‑provided nonce.
  - The backend verifies the signature, mints a JWT and sends it to the frontend (cookie/header).
3. **Authorized API calls**
  - Frontend libraries (`lib/*.ts`) attach the JWT to requests.
  - Express middleware verifies the token and identifies the user.
  - Controllers call services, which:
    - Read/write data via Prisma.
    - Call the Gonka API via `gonka-openai` for LLM operations.
4. **Sensitive data handling**
  - Secrets and tokens are supplied via environment variables.
  - Optional encryption utilities allow storing certain values encrypted in the database.
  - JWT secrets and encryption keys should be strong and never committed to source control.
5. **Response back to the user**
  - Backend returns normalized JSON payloads.
  - Frontend updates React state/Zustand store and UI components to reflect messages, balance, analytics, etc.

