import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: ["query", "error", "warn"],
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

export const connectDatabase = async (): Promise<void> => {
    try {
        await prisma.$connect();
        console.log("Database connected successfully");

        await prisma.$queryRaw`SELECT 1`;
        console.log("Database connection verified");
    } catch (error) {
        console.error("Failed to connect to database:", error);
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
        }
        throw error;
    }
};

export const disconnectDatabase = async (): Promise<void> => {
    await prisma.$disconnect();
    console.log("Database disconnected");
};