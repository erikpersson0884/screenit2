import prisma from "../lib/prisma.js";

export const checkHealth = async () => {
    // Check DB connection
    await prisma.$queryRaw`SELECT 1`;

    return {
        status: "ok",
        timestamp: new Date().toISOString(),
    };
};