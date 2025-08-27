import { PrismaClient } from "@prisma/client";

/**
 * This file creates a singleton instance of the PrismaClient.
 * The singleton pattern ensures that only one instance of the client
 * is ever created, which is crucial for managing database connections
 * efficiently, especially in a serverless environment like Vercel.
 *
 * It uses a global variable to persist the client instance across
 * hot reloads in development, preventing connection pool exhaustion.
 */

// We extend the global object to hold our PrismaClient instance.
// This is necessary to persist it across hot reloads in development.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// We export a singleton instance of the PrismaClient.
// If an instance already exists in the global object, we use it.
// Otherwise, we create a new one.
export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        // Optional: log database queries for debugging purposes.
        log: ["query", "info", "warn", "error"],
    });

// In a non-production environment, we save the instance to the global object.
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
