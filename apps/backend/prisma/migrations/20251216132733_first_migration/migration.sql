-- CreateEnum
CREATE TYPE "wallet_chain" AS ENUM ('ETHEREUM', 'SOLANA', 'COSMOS', 'GONKA');

-- CreateEnum
CREATE TYPE "wallet_type" AS ENUM ('METAMASK', 'PHANTOM', 'RABBY', 'TRUSTWALLET', 'COINBASEWALLET');

-- CreateEnum
CREATE TYPE "assets" AS ENUM ('GNK');

-- CreateEnum
CREATE TYPE "deposit_status" AS ENUM ('PENDING', 'CONFIRMED', 'FAILED');

-- CreateEnum
CREATE TYPE "bridge_status" AS ENUM ('INITIATED', 'BRIDGING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "swap_status" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "onramp_status" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "message_role" AS ENUM ('SYSTEM', 'USER', 'ASSISTANT');

-- CreateEnum
CREATE TYPE "attachment_type" AS ENUM ('FILE', 'URL', 'IMAGE');

-- CreateEnum
CREATE TYPE "usage_status" AS ENUM ('SUCCESS', 'ERROR', 'TIMEOUT');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "walletChain" "wallet_chain" NOT NULL,
    "walletType" "wallet_type",
    "depositAddress" TEXT NOT NULL,
    "displayName" TEXT,
    "avatarUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastSeenAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "balances" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "asset" "assets" NOT NULL DEFAULT 'GNK',
    "amount" DECIMAL(20,8) NOT NULL DEFAULT 0,
    "lockedAmount" DECIMAL(20,8) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "balances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deposits" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "txHash" TEXT NOT NULL,
    "fromChain" "wallet_chain" NOT NULL,
    "asset" "assets" NOT NULL DEFAULT 'GNK',
    "amount" DECIMAL(20,8) NOT NULL,
    "status" "deposit_status" NOT NULL,
    "blockHeight" BIGINT,
    "confirmations" INTEGER,
    "errorMessage" TEXT,
    "confirmedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "deposits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bridge_transfers" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "fromChain" "wallet_chain" NOT NULL,
    "toChain" "wallet_chain" NOT NULL DEFAULT 'GONKA',
    "fromTxHash" TEXT,
    "toTxHash" TEXT,
    "amount" DECIMAL(20,8) NOT NULL,
    "bridgeFee" DECIMAL(20,8),
    "status" "bridge_status" NOT NULL,
    "bridgeProvider" TEXT,
    "errorMessage" TEXT,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bridge_transfers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "swaps" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "fromToken" TEXT NOT NULL,
    "toToken" TEXT NOT NULL,
    "fromAmount" DECIMAL(20,8) NOT NULL,
    "toAmount" DECIMAL(20,8),
    "chain" TEXT NOT NULL,
    "dexProvider" TEXT,
    "txHash" TEXT,
    "status" "swap_status" NOT NULL,
    "slippage" DECIMAL(5,2),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "swaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "onramp_transactions" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "provider" TEXT NOT NULL,
    "providerTxId" TEXT NOT NULL,
    "fiatAmount" DECIMAL(10,2) NOT NULL,
    "fiatCurrency" TEXT NOT NULL DEFAULT 'USD',
    "cryptoAmount" DECIMAL(20,8),
    "cryptoCurrency" TEXT NOT NULL DEFAULT 'USDC',
    "destinationAddress" TEXT NOT NULL,
    "status" "onramp_status" NOT NULL,
    "webhookData" JSONB,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "onramp_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_sessions" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'New Chat',
    "model" TEXT NOT NULL,
    "systemPrompt" TEXT,
    "temperature" DECIMAL(3,2) DEFAULT 0.7,
    "maxTokens" INTEGER DEFAULT 4096,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "lastMessageAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" UUID NOT NULL,
    "sessionId" UUID NOT NULL,
    "role" "message_role" NOT NULL,
    "contentEncrypted" BYTEA NOT NULL,
    "nonce" BYTEA NOT NULL,
    "contentHash" TEXT,
    "promptTokens" INTEGER,
    "completionTokens" INTEGER,
    "totalTokens" INTEGER,
    "costGnk" DECIMAL(12,8),
    "latencyMs" INTEGER,
    "model" TEXT,
    "finishReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_attachments" (
    "id" UUID NOT NULL,
    "messageId" UUID NOT NULL,
    "type" "attachment_type" NOT NULL,
    "filename" TEXT,
    "url" TEXT,
    "mimeType" TEXT,
    "sizeBytes" INTEGER,
    "storageKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_keys" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "keyPrefix" TEXT NOT NULL,
    "keyHash" TEXT NOT NULL,
    "rateLimitPerMinute" INTEGER DEFAULT 60,
    "rateLimitPerDay" INTEGER DEFAULT 10000,
    "monthlySpendLimit" DECIMAL(20,8),
    "allowedModels" TEXT[],
    "allowedIps" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastUsedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "api_keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usage_logs" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "apiKeyId" UUID,
    "sessionId" UUID,
    "messageId" UUID,
    "model" TEXT NOT NULL,
    "promptTokens" INTEGER NOT NULL,
    "completionTokens" INTEGER NOT NULL,
    "totalTokens" INTEGER NOT NULL,
    "costGnk" DECIMAL(12,8) NOT NULL,
    "latencyMs" INTEGER,
    "status" "usage_status",
    "errorMessage" TEXT,
    "ipAddress" INET,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usage_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "model_config" (
    "id" UUID NOT NULL,
    "modelName" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'gonka',
    "contextWindow" INTEGER NOT NULL,
    "maxOutputTokens" INTEGER NOT NULL,
    "pricePer1kInput" DECIMAL(12,8) NOT NULL,
    "pricePer1kOutput" DECIMAL(12,8) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "capabilities" TEXT[],
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "model_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_config" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "description" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_config_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "audit_log" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" UUID,
    "metadata" JSONB,
    "ipAddress" INET,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_walletAddress_key" ON "users"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "users_depositAddress_key" ON "users"("depositAddress");

-- CreateIndex
CREATE INDEX "users_walletAddress_idx" ON "users"("walletAddress");

-- CreateIndex
CREATE INDEX "users_depositAddress_idx" ON "users"("depositAddress");

-- CreateIndex
CREATE INDEX "balances_userId_idx" ON "balances"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "balances_userId_asset_key" ON "balances"("userId", "asset");

-- CreateIndex
CREATE UNIQUE INDEX "deposits_txHash_key" ON "deposits"("txHash");

-- CreateIndex
CREATE INDEX "deposits_userId_idx" ON "deposits"("userId");

-- CreateIndex
CREATE INDEX "deposits_status_idx" ON "deposits"("status");

-- CreateIndex
CREATE INDEX "deposits_txHash_idx" ON "deposits"("txHash");

-- CreateIndex
CREATE INDEX "bridge_transfers_userId_idx" ON "bridge_transfers"("userId");

-- CreateIndex
CREATE INDEX "bridge_transfers_status_idx" ON "bridge_transfers"("status");

-- CreateIndex
CREATE INDEX "swaps_userId_idx" ON "swaps"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "onramp_transactions_providerTxId_key" ON "onramp_transactions"("providerTxId");

-- CreateIndex
CREATE INDEX "onramp_transactions_userId_idx" ON "onramp_transactions"("userId");

-- CreateIndex
CREATE INDEX "onramp_transactions_providerTxId_idx" ON "onramp_transactions"("providerTxId");

-- CreateIndex
CREATE INDEX "chat_sessions_userId_idx" ON "chat_sessions"("userId");

-- CreateIndex
CREATE INDEX "chat_sessions_updatedAt_idx" ON "chat_sessions"("updatedAt" DESC);

-- CreateIndex
CREATE INDEX "messages_sessionId_createdAt_idx" ON "messages"("sessionId", "createdAt");

-- CreateIndex
CREATE INDEX "message_attachments_messageId_idx" ON "message_attachments"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "api_keys_keyHash_key" ON "api_keys"("keyHash");

-- CreateIndex
CREATE INDEX "api_keys_userId_idx" ON "api_keys"("userId");

-- CreateIndex
CREATE INDEX "api_keys_keyHash_idx" ON "api_keys"("keyHash");

-- CreateIndex
CREATE INDEX "usage_logs_userId_createdAt_idx" ON "usage_logs"("userId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "usage_logs_apiKeyId_createdAt_idx" ON "usage_logs"("apiKeyId", "createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "model_config_modelName_key" ON "model_config"("modelName");

-- CreateIndex
CREATE INDEX "audit_log_userId_createdAt_idx" ON "audit_log"("userId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "audit_log_createdAt_idx" ON "audit_log"("createdAt" DESC);

-- AddForeignKey
ALTER TABLE "balances" ADD CONSTRAINT "balances_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deposits" ADD CONSTRAINT "deposits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bridge_transfers" ADD CONSTRAINT "bridge_transfers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "swaps" ADD CONSTRAINT "swaps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "onramp_transactions" ADD CONSTRAINT "onramp_transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_sessions" ADD CONSTRAINT "chat_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "chat_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_attachments" ADD CONSTRAINT "message_attachments_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usage_logs" ADD CONSTRAINT "usage_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usage_logs" ADD CONSTRAINT "usage_logs_apiKeyId_fkey" FOREIGN KEY ("apiKeyId") REFERENCES "api_keys"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usage_logs" ADD CONSTRAINT "usage_logs_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "chat_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usage_logs" ADD CONSTRAINT "usage_logs_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
