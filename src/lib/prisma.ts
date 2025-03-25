// import { PrismaClient } from "@educrib/database/client";
import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line unused-imports/no-unused-vars
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // Enable logs
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
