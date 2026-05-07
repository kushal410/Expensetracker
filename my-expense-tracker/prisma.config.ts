import "dotenv/config";
import { defineConfig } from "prisma/config";

const defaultSqliteUrl = process.env["VERCEL"] ? "file:/tmp/dev.db" : "file:./prisma/dev.db";
const datasourceUrl = process.env["DATABASE_URL"] ?? defaultSqliteUrl;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: datasourceUrl,
  },
});
