FROM node:18-alpine AS base

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/ui/package.json ./packages/ui/ 2>/dev/null || echo "No UI package found"

RUN pnpm install --frozen-lockfile

COPY apps/backend/ ./apps/backend/
COPY packages/ ./packages/
COPY turbo.json ./
RUN pnpm run build

FROM node:18-alpine AS production

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/ui/package.json ./packages/ui/ 2>/dev/null || echo "No UI package found"

RUN pnpm install --frozen-lockfile --prod

COPY --from=base /app/apps/backend/dist ./apps/backend/dist
COPY --from=base /app/apps/backend/prisma ./apps/backend/prisma
COPY --from=base /app/node_modules ./node_modules

COPY apps/backend/.env ./apps/backend/.env

RUN npx prisma generate --schema=apps/backend/prisma/schema.prisma

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

CMD ["node", "apps/backend/dist/server.js"]
