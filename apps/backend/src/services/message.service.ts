import { PrismaClient, Message, MessageRole } from "@prisma/client";
import { encrypt, decrypt, computeContentHash, verifyContentIntegrity } from "../utils/encryption";
import { gonkaChat } from "./gonka.service";

const prisma = new PrismaClient();

interface CreateMessageParams {
  sessionId: string;
  role: MessageRole;
  content: string;
  model?: string;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  costGnk?: number;
  latencyMs?: number;
  finishReason?: string;
}

interface SendMessageParams {
  sessionId: string;
  userMessage: string;
  model?: string;
}

export const createMessage = async (params: CreateMessageParams): Promise<Message> => {
  const { content, ...otherParams } = params;

  const { ciphertextB64, nonceB64 } = encrypt(content);
  const contentHash = computeContentHash(content);

  return prisma.message.create({
    data: {
      ...otherParams,
      contentEncrypted: ciphertextB64,
      nonce: nonceB64,
      contentHash,
    },
  });
};


export const sendMessageAndGetResponse = async ({
  sessionId,
  userMessage,
  model = "Qwen/Qwen3-32B-FP8",
}: SendMessageParams) => {
  const startTime = Date.now();
  
  try {
    const gonkaResponse = await gonkaChat(userMessage, model);
    const assistantMessage = gonkaResponse.choices?.[0]?.message?.content || "";
    
    const endTime = Date.now();
    const latencyMs = endTime - startTime;
    
    const userMessageData = await createMessage({
      sessionId,
      role: MessageRole.USER,
      content: userMessage,
      model,
      promptTokens: gonkaResponse.usage?.prompt_tokens,
      completionTokens: gonkaResponse.usage?.completion_tokens,
      totalTokens: gonkaResponse.usage?.total_tokens,
      costGnk: gonkaResponse.usage?.total_tokens ? 
        parseFloat((gonkaResponse.usage.total_tokens * 0.00001).toFixed(8)) : undefined,
      latencyMs,
    });
    
    const assistantMessageData = await createMessage({
      sessionId,
      role: MessageRole.ASSISTANT,
      content: assistantMessage,
      model,
      promptTokens: gonkaResponse.usage?.prompt_tokens,
      completionTokens: gonkaResponse.usage?.completion_tokens,
      totalTokens: gonkaResponse.usage?.total_tokens,
      costGnk: gonkaResponse.usage?.total_tokens ? 
        parseFloat((gonkaResponse.usage.total_tokens * 0.00001).toFixed(8)) : undefined,
      latencyMs,
      finishReason: gonkaResponse.choices?.[0]?.finish_reason,
    });
    
    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { 
        lastMessageAt: new Date(),
        updatedAt: new Date(),
      },
    });
    
    return {
      userMessage: {
        id: userMessageData.id,
        role: userMessageData.role,
        content: userMessage,
        createdAt: userMessageData.createdAt,
      },
      assistantMessage: {
        id: assistantMessageData.id,
        role: assistantMessageData.role,
        content: assistantMessage,
        createdAt: assistantMessageData.createdAt,
      },
      usage: gonkaResponse.usage,
      model: gonkaResponse.model,
      latencyMs,
    };
    
  } catch (error) {
    console.error("Error in sendMessageAndGetResponse:", error);
    
    await createMessage({
      sessionId,
      role: MessageRole.USER,
      content: userMessage,
      model,
      latencyMs: Date.now() - startTime,
    });
    
    throw error;
  }
};

export const getMessagesBySessionId = async (
  sessionId: string
): Promise<Array<Message & { decryptedContent: string }>> => {
  const messages = await prisma.message.findMany({
    where: { sessionId },
    orderBy: { createdAt: "asc" },
  });

  return messages.map((m) => {
    const decryptedContent = decrypt(m.contentEncrypted, m.nonce);
    
    if (m.contentHash) {
      if (!verifyContentIntegrity(decryptedContent, m.contentHash)) {
        console.error(`Data integrity violation for message ${m.id}`);
        throw new Error(`Message ${m.id} has been tampered with or corrupted`);
      }
    } else {
      console.warn(`Message ${m.id} has no contentHash (legacy data)`);
    }
    
    return {
      ...m,
      decryptedContent,
    };
  });
};


export const getMessageById = async (
  messageId: string
): Promise<(Message & { decryptedContent: string }) | null> => {
  const message = await prisma.message.findUnique({
    where: { id: messageId },
  });

  if (!message) return null;

  const decryptedContent = decrypt(message.contentEncrypted, message.nonce);
  
  if (message.contentHash) {
    if (!verifyContentIntegrity(decryptedContent, message.contentHash)) {
      console.error(`Data integrity violation for message ${message.id}`);
      throw new Error(`Message ${message.id} has been tampered with or corrupted`);
    }
  } else {
    console.warn(`Message ${message.id} has no contentHash (legacy data)`);
  }

  return {
    ...message,
    decryptedContent,
  };
};


export const deleteMessage = async (messageId: string): Promise<Message | null> => {
  try {
    return await prisma.message.delete({
      where: { id: messageId },
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    return null;
  }
};