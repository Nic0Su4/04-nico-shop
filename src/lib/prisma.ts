import { PrismaClient } from "@/generated/prisma"; // Tu ruta de importación

declare global {
  // Esto permite que TypeScript reconozca `prisma` en el objeto global.
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export { prisma };
