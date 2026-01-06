import { PrismaClient, Message, MessageRole } from "@prisma/client";
import { encrypt, decrypt } from "../utils/encryption";
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

export const createMessage = async (
  params: CreateMessageParams
): Promise<Message> => {
  const { content, ...otherParams } = params;
  
  const { ciphertext, nonce } = encrypt(content);
  
  const message = await prisma.message.create({
    data: {
      ...otherParams,
      contentEncrypted: Buffer.from(ciphertext),
      nonce: Buffer.from(nonce),
    },
  });

  return message;
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
  
  return messages.map(message => ({
    ...message,
    decryptedContent: decrypt(Buffer.from(message.contentEncrypted), Buffer.from(message.nonce)),
  }));
};

export const getMessageById = async (
  messageId: string
): Promise<(Message & { decryptedContent: string }) | null> => {
  const message = await prisma.message.findUnique({
    where: { id: messageId },
  });
  
  if (!message) return null;
  
  return {
    ...message,
    decryptedContent: decrypt(Buffer.from(message.contentEncrypted), Buffer.from(message.nonce)),
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