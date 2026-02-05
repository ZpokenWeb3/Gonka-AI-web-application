## Gonka AI Web Application

### 1. Overview

Gonka AI Web Application is a monorepo project that lets you use large language models (LLMs) exposed via the **Gonka API**.
It provides a web interface for chatting with models, managing API keys, tracking usage and costs, and working with your Gonka balance.

The repo contains:

- a **backend** (Node.js/Express + Prisma/PostgreSQL) that talks to the Gonka API and your database
- a **frontend** (Next.js) that provides the user and developer UI

---

### 2. Current features

- **Wallet-based authentication**
  - Sign in with a crypto wallet (via Wagmi/RainbowKit).
  - Secure JWT-based session on the backend.

- **LLM chat interface**
  - Chat with LLMs available via the Gonka API.
  - Select models, send messages, and view responses in a chat-like UI.
  - Basic chat session handling and history (via `chat` pages and store).

- **Developer API keys**
  - Create and manage Gonka API keys from the `Developer API` section.
  - See your existing keys and their metadata.

- **Balance, deposits, withdrawals**
  - View current Gonka balance on the `Account` page.
  - Deposit funds and see transaction history.
  - Withdraw funds using supported methods and review withdrawal details.

- **Analytics**
  - Usage statistics for API calls and tokens.
  - Summary blocks and charts to understand consumption and spend.

- **Settings**
  - Basic account/settings page for configuring preferences (e.g. default model, UI-related options).

---

### 3. Future features

These are examples of planned or potential improvements:

- **Bridge & Swap flows**  
  Add full bridge and swap logic to move assets between supported networks and swap tokens directly inside the app.

- **Extended balance operations**  
  More flexible deposit and withdrawal flows, additional payment/on-ramp providers, and better status tracking for top‑ups and payouts.

- **Team & organization workspaces**  
  Shared billing, roles/permissions, and project-level API keys.

- **Extended model catalog**  
  More LLMs and modalities (vision, tools, structured outputs) exposed via Gonka.

- **Advanced session management**  
  Named conversations, pinning, and sharing chats.

---

### 4. How to install / run

#### 4.1 Clone and install dependencies

From your terminal:

```bash
git clone <this-repo-url>
cd Gonka-AI-web-application

pnpm install
```

This installs dependencies for all workspaces (`apps/*`, `packages/*`).

#### 4.2 Configure the backend (`apps/backend`)

Create an `.env` file in `apps/backend`:

```bash
cd apps/backend

cp .env.example .env # if available, otherwise create manually
```

Minimal set of environment variables (adjust values to your setup):

```bash
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/gonka_db
JWT_SECRET=your_long_random_jwt_secret
ENCRYPTION_KEY=64_hex_chars_key_for_aes_256
GONKA_SOURCE_URL=https://api.gonka.ai/...
GONKA_PRIVATE_KEY=your_gonka_private_key
FRONTEND_URL=http://localhost:3000
```

Notes:

- `ENCRYPTION_KEY` **must** be exactly 64 hex characters (32 bytes) — otherwise the app will throw on startup.
- `FRONTEND_URL` is used for CORS; in local development it's usually `http://localhost:3000`.

Apply database migrations and generate Prisma client:

```bash
cd apps/backend
pnpm prisma migrate dev
pnpm prisma generate
```

#### 4.3 Configure the frontend (`apps/web`)

The frontend talks to the backend via `NEXT_PUBLIC_API_BASE_URL`.  
By default, it falls back to `http://localhost:5000` in the code:

```ts
// apps/web/lib/* files
process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";
```

If you need to override it, create `apps/web/.env.local`:

```bash
cd apps/web
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:5000" > .env.local
```

#### 4.4 Run the app in development

**Option A — run both apps via Turborepo (recommended):**

```bash
cd Gonka-AI-web-application
pnpm dev
```

This will:

- start the **backend** dev server (default: `http://localhost:5000`)
- start the **frontend** dev server (default: `http://localhost:3000`)

Open `http://localhost:3000` in your browser.

**Option B — run backend and frontend separately:**

```bash
# Backend
cd apps/backend
pnpm dev

# Frontend (in a second terminal)
cd apps/web
pnpm dev
```

---

### 5. Requirements

- **Node.js**: version **18 or higher** (see `package.json` engines)
- **pnpm**: the repository is configured as a pnpm workspace (`pnpm-workspace.yaml`)
- **PostgreSQL**: running instance with access to a database (e.g. `gonka_db`)
- **Git**: to clone and update the repository
- Modern browser (Chrome, Firefox, Safari, Edge) to use the web UI
