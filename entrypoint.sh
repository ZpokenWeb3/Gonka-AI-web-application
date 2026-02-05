#!/bin/bash
set -e

echo "=== Starting Backend Service ==="
echo "Waiting for database to be ready..."

MAX_RETRIES=30
RETRY_COUNT=0

until pg_isready -h postgres -p 5432 -U user 2>/dev/null; do
  RETRY_COUNT=$((RETRY_COUNT + 1))
  if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
    echo "ERROR: Database is not ready after $MAX_RETRIES attempts"
    exit 1
  fi
  echo "Database is unavailable - sleeping (attempt $RETRY_COUNT/$MAX_RETRIES)"
  sleep 2
done

echo "✓ Database is ready!"
echo "Running migrations..."

cd /app/apps/backend
export DATABASE_URL="${DATABASE_URL:-postgresql://user:password@postgres:5432/gonka_db}"

if npx prisma migrate deploy; then
  echo "✓ Migrations completed successfully"
else
  echo "⚠ Migration failed, but continuing..."
fi

echo "Starting server..."
echo "DATABASE_URL: $DATABASE_URL"

exec node /app/apps/backend/dist/src/server.js
