# -----------------
# Builder stage
FROM node:20-alpine AS builder

RUN npm install -g pnpm

# Принимаем build args для переменных окружения
ARG NEXT_PUBLIC_API_BASE_URL=http://backend:5000

WORKDIR /app
COPY . .

RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/web
# Устанавливаем переменные окружения для сборки
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
RUN pnpm run build

# -----------------
# Production stage
FROM node:20-alpine AS production

LABEL org.opencontainers.image.source="https://github.com/ZpokenWeb3/Gonka-AI-web-application"
LABEL org.opencontainers.image.description="Gonka AI Service frontend"

WORKDIR /app

# В монорепо Next.js standalone создаёт структуру apps/web/.next/standalone/apps/web/
# Копируем всю standalone структуру
COPY --from=builder /app/apps/web/.next/standalone ./

# Копируем static файлы - они должны быть в apps/web/.next/static относительно server.js
# Если server.js в apps/web/, то static должен быть в apps/web/.next/static
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static

# Копируем public
COPY --from=builder /app/apps/web/public ./apps/web/public

ENV NODE_ENV=production
ENV FRONTEND_PORT=3000

EXPOSE ${FRONTEND_PORT}

# Запускаем server.js из правильного места
# В standalone режиме для монорепо server.js обычно в apps/web/server.js
CMD ["node", "apps/web/server.js"]
