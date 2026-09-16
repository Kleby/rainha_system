import "dotenv/config"
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const CONFIG = {
    host: process.env.ADAPTER_HOST || "",
    port: Number(process.env.ADAPTER_PORT),
    user: process.env.ADAPTER_USER || "",
    password: process.env.ADAPTER_PASSWORD || "",
    database: process.env.ADAPTER_DB ||""
}

const adapter = new PrismaMariaDb(CONFIG);

export const prismaClient = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development"? ["query", "error", "warn"] : ["error"] 
});

