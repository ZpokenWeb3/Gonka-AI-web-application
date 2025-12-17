import {PrismaClient} from "@prisma/client";

class DatabaseService {
    private static instance: PrismaClient;

    static getInstance(): PrismaClient {
        if(!DatabaseService.instance) {
            DatabaseService.instance = new PrismaClient({
                log: ['query', 'error', 'warn']
            });
        }

        return DatabaseService.instance;
    }

    static async connect(): Promise<void> {
        const prisma = DatabaseService.getInstance();
        await prisma.$connect();
        console.log('Database connected');
    }

    static async disconnect(): Promise<void> {
        const prisma = DatabaseService.getInstance();
        await prisma.$disconnect();
        console.log('Database disconnected');
    }
}

export const prisma = DatabaseService.getInstance();

export default DatabaseService;