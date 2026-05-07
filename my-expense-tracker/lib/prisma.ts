import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const defaultSqliteUrl = process.env["VERCEL"] ? "file:/tmp/dev.db" : "file:./prisma/dev.db";
const databaseUrl = process.env["DATABASE_URL"] ?? defaultSqliteUrl;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaBetterSqlite3({
      url: databaseUrl,
    }),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
