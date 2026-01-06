import { prisma } from "../config/database";

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
  }
) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      walletAddress: true,
      displayName: true,
      avatarUrl: true,
      updatedAt: true,
    },
  });

  return user;
};
