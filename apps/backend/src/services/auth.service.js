"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.generateNonce = void 0;
const ethers_1 = require("ethers");
const crypto_1 = __importDefault(require("crypto"));
const database_1 = require("../config/database");
const jwt_1 = require("../utils/jwt");
const generateNonce = async (walletAddress) => {
    const existingUser = await database_1.prisma.user.findUnique({
        where: { walletAddress: walletAddress.toLowerCase() },
    });
    if (existingUser?.authNonce) {
        return existingUser.authNonce;
    }
    const nonce = `Sign this message to login: ${crypto_1.default.randomUUID()}`;
    await database_1.prisma.user.upsert({
        where: { walletAddress: walletAddress.toLowerCase() },
        update: { authNonce: nonce },
        create: {
            walletAddress: walletAddress.toLowerCase(),
            walletChain: "ETHEREUM",
            authNonce: nonce,
            depositAddress: walletAddress.toLowerCase(),
        }
    });
    return nonce;
};
exports.generateNonce = generateNonce;
const verify = async (walletAddress, signature, nonce) => {
    const user = await database_1.prisma.user.findUnique({
        where: { walletAddress: walletAddress.toLowerCase() },
    });
    if (!user?.authNonce) {
        throw new Error("Invalid auth");
    }
    console.log("Stored authNonce:", user.authNonce);
    if (user.authNonce !== nonce) {
        throw new Error("Invalid nonce");
    }
    const recovered = ethers_1.ethers.verifyMessage(nonce, signature);
    if (recovered.toLowerCase() !== walletAddress.toLowerCase()) {
        throw new Error("Invalid signature");
    }
    await database_1.prisma.user.update({
        where: { id: user.id },
        data: {
            authNonce: null,
            lastSeenAt: new Date()
        }
    });
    return (0, jwt_1.signToken)({
        userId: user.id,
        walletAddress: user.walletAddress,
    });
};
exports.verify = verify;
