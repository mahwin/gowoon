import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as typeof global & { prisma?: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") globalForPrisma.prisma = prisma;

export default prisma;