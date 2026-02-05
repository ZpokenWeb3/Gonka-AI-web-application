import { prisma } from "../config/database";
import { ChatModel } from "@prisma/client";

export const getCurrentUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      defaultModel: true,
      temperaure: true,
      lowBalanceAlert: true,
      depositNotifications: true
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const updateUserProfile = async (
  userId: string,
  data: {
    displayName?: string;
    avatarUrl?: string;
    lowBalanceAlert?: boolean;
    depositNotifications?: boolean;
    defaultModel?: ChatModel
  }
) => {
  const updateData = {
    ...data,
    defaultModel: data.defaultModel ? data.defaultModel as ChatModel : undefined
  };

  const user = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      defaultModel: true,
      temperaure: true,
      lowBalanceAlert: true,
      depositNotifications: true,
      walletAddress: true,
      displayName: true,
      avatarUrl: true,
      updatedAt: true,
    },
  });

  return user;
};

