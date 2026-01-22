"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
class DatabaseService {
    static getInstance() {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new client_1.PrismaClient({
                log: ['query', 'error', 'warn']
            });
        }
        return DatabaseService.instance;
    }
    static async connect() {
        const prisma = DatabaseService.getInstance();
        await prisma.$connect();
        console.log('Database connected');
    }
    static async disconnect() {
        const prisma = DatabaseService.getInstance();
        await prisma.$disconnect();
        console.log('Database disconnected');
    }
}
exports.prisma = DatabaseService.getInstance();
exports.default = DatabaseService;
