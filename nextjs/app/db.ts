// This file sets up a singleton instance of the Prisma Client
// This is a common pattern to prevent multiple client instances
// especially in development with hot reloading.

// --- Start: Corrected import path ---
// Import PrismaClient from the actual generated location
import { PrismaClient } from "../app/generated/prisma";

// Declare a global variable to hold the Prisma Client instance
// This is necessary because in development, Next.js hot reloading
// can cause this module to be re-executed multiple times.
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// Create or reuse the PrismaClient instance
// If a global instance exists, use it. Otherwise, create a new one.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Optional: Log database queries to the console in development
    log: ["query"],
  });

// In development, attach the Prisma Client instance to the global object
// This ensures that subsequent hot reloads reuse the same instance.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
