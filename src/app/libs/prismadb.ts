import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

// To prevent hot module reload from creating new instances of PrismaClient in dev mode
if (process.env.NODE_ENV === "development") {
  globalThis.prisma = client;
}

export default client;
