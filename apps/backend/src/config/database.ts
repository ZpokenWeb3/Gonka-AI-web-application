import {PrismaClient} from "@prisma/client";

class DatabaseService {
    private static instance: PrismaClient;

    static getInstance(): PrismaClient {
        if(!DatabaseService.instance) {
            DatabaseService.instance = new PrismaClient({
                log: ['query', 'error', 'warn'],
                datasources: {
                    db: {
                        url: process.env.DATABASE_URL,
                    },
                },
            });
        }

        return DatabaseService.instance;
    }

    static async connect(): Promise<void> {
        const prisma = DatabaseService.getInstance();
        try {
            await prisma.$connect();
            console.log('Database connected successfully');
            
            // Проверяем подключение простым запросом
            await prisma.$queryRaw`SELECT 1`;
            console.log('Database connection verified');
        } catch (error) {
            console.error('Failed to connect to database:', error);
            if (error instanceof Error) {
                console.error('Error message:', error.message);
                console.error('Error stack:', error.stack);
            }
            throw error;
        }
    }

    static async disconnect(): Promise<void> {
        const prisma = DatabaseService.getInstance();
        await prisma.$disconnect();
        console.log('Database disconnected');
    }
}

export const prisma = DatabaseService.getInstance();

export default DatabaseService;