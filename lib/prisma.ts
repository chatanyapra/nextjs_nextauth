// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Global type declaration for hot-reloading
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create a singleton PrismaClient
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // Optional: log queries for dev
  });

// Avoid re-creating PrismaClient on every reload in development
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
