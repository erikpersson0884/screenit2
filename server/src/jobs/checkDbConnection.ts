import prisma from "../lib/prisma.js";
import logger from "../lib/logger.js";
import { setDbReady } from "../lib/dbState.js";

const CHECK_INTERVAL = 10_000; // 10 seconds

export async function checkDatabase() {
    try {
        logger.debug("Checking database connection...");
        await prisma.$connect();
        await prisma.$queryRaw`SELECT 1`;

        setDbReady(true);
        logger.debug("🟢 Database healthy");
    } catch (err) {
        setDbReady(false);
        logger.error("🔴 Database unavailable");
    }
}

export async function startDbHealthCheck() {
    logger.info("Starting database health check...");
    await checkDatabase();

    // keep checking
    setInterval(checkDatabase, CHECK_INTERVAL);
}
