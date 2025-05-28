import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
}

const db = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

export default db;
// lib/prisma.ts
// import { PrismaClient } from '@prisma/client'
// const db = new PrismaClient()
// export default db
