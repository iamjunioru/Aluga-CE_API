import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
  var prisma__db: PrismaClient | undefined;
}

if (!global.prisma__db) {
  global.prisma__db = new PrismaClient();
}

db = global.prisma__db;

export { db };
