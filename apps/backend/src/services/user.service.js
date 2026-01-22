"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.getCurrentUser = void 0;
const database_1 = require("../config/database");
const getCurrentUser = async (userId) => {
    const user = await database_1.prisma.user.findUnique({
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
exports.getCurrentUser = getCurrentUser;
const updateUserProfile = async (userId, data) => {
    const updateData = {
        ...data,
        defaultModel: data.defaultModel ? data.defaultModel : undefined
    };
    const user = await database_1.prisma.user.update({
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
exports.updateUserProfile = updateUserProfile;
