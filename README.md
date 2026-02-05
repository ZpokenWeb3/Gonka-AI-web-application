## Gonka AI Web Application

Monorepo project for Gonka AI: a Node.js/Express + Prisma/PostgreSQL backend and a Next.js frontend, managed with `pnpm` and Turborepo.

### Tech stack

- **Backend**: Node.js, Express, Prisma, PostgreSQL, JWT, AES‑256 encryption.
- **Frontend**: Next.js (App Router), React, Tailwind, Wagmi/RainbowKit for wallets.
- **Tooling**: pnpm, Turborepo, TypeScript, ESLint, Prettier.

### Repository structure

- `apps/backend`: REST API, authentication, Gonka SDK integration, Prisma schema and migrations.
- `apps/web`: Gonka AI web UI.
- `packages/*`: shared config and UI components.

### Prerequisites

- **Node.js** >= 18
- **pnpm** (the repo uses `pnpm-workspace.yaml`)
- **PostgreSQL** (local instance or remote database)

---

### 1. Install dependencies

From the repository root:

```bash
pnpm install
```

This will install dependencies for all workspaces (`apps/*`, `packages/*`).

---

### 2. Backend configuration (`apps/backend`)

Create an `.env` file in `apps/backend`:

```bash
cd apps/backend

cp .env.example .env # if you have a template, otherwise create manually
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

#### Apply database migrations

Still in `apps/backend`:

```bash
pnpm prisma migrate dev
pnpm prisma generate
```

This will create/update the database schema defined in `prisma/schema.prisma` and generate the Prisma client.

---

### 3. Frontend configuration (`apps/web`)

The frontend talks to the backend via `NEXT_PUBLIC_API_BASE_URL`. By default, it falls back to `http://localhost:5000`:

```ts
// apps/web/lib/* files
process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";
```

If you want to override it, create `apps/web/.env.local`:

```bash
cd apps/web

echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:5000" > .env.local
```

Other Next.js env variables can be added here as needed.

---

### 4. Running the project locally

You can run both apps together via Turborepo or start them separately.

#### Option A: Run everything with Turborepo (recommended)

From the repository root:

```bash
pnpm dev
```

This will:

- start the **backend** dev server (default: `http://localhost:5000`),
- start the **frontend** dev server (default: `http://localhost:3000`).

Make sure PostgreSQL is running and `DATABASE_URL` points to a valid database.

#### Option B: Run backend and frontend separately

**Backend:**

```bash
cd apps/backend
pnpm dev
```

This runs `ts-node` with your `.env` file loaded via `dotenv/config` and starts the API server.

**Frontend:**

```bash
cd apps/web
pnpm dev
```

Open `http://localhost:3000` in your browser.

---

### 5. Useful scripts

From the repository root:

- `pnpm dev` — run all apps in dev mode via Turborepo.
- `pnpm build` — build all apps and packages.
- `pnpm lint` — run ESLint across the monorepo.
- `pnpm check-types` — run TypeScript type checks.

From `apps/backend`:

- `pnpm dev` — start the backend in development mode.
- `pnpm build` — compile TypeScript to JavaScript.
- `pnpm prisma migrate dev` — apply dev migrations to the database.
- `pnpm prisma generate` — generate Prisma client.

From `apps/web`:

- `pnpm dev` — start Next.js dev server.
- `pnpm build` — build the frontend for production.
- `pnpm start` — start the built frontend in production mode.

---

### 6. Production notes

- Use strong, unique values for `JWT_SECRET`, `ENCRYPTION_KEY`, and all Gonka-related secrets.
- Configure `FRONTEND_URL` and `NEXT_PUBLIC_API_BASE_URL` to match your real domains.
- For containerization or cloud deployment you can build your own Dockerfiles or deployment manifests based on this structure; this repository focuses on the runtime code and local development flow.
