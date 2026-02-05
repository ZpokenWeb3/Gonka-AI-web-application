-- CreateEnum
CREATE TYPE "chat_model" AS ENUM ('QWEN25', 'QWEN323', 'QWEN332', 'QWENQWQ', 'REDHAT');

-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "contentEncrypted" SET DATA TYPE TEXT,
ALTER COLUMN "nonce" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "defaultModel" "chat_model",
ADD COLUMN     "depositNotifications" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lowBalanceAlert" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "systemPrompt" TEXT,
ADD COLUMN     "temperaure" DOUBLE PRECISION NOT NULL DEFAULT 0.7;
