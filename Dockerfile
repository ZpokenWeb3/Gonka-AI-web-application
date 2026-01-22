# =====================
# Stage 1: Build
# =====================
FROM node:20-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

# Copy entire monorepo
COPY . .

# Install dependencies for all workspaces
RUN pnpm install --frozen-lockfile

# Generate prisma client
RUN cd apps/backend && pnpm prisma generate

# Build backend
RUN pnpm --filter backend run build


# =====================
# Stage 2: Production
# =====================
FROM node:20-alpine AS production

WORKDIR /app

RUN npm install -g pnpm

# Copy built output
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/prisma ./apps/backend/prisma

# Copy node_modules
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 5000

CMD ["node", "apps/backend/dist/server.js"]
