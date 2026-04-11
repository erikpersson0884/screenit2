import prisma from "../lib/prisma.js";
import logger from "../lib/logger.js";
import { setDbReady } from "../lib/dbState.js";

const CHECK_INTERVAL = 10_000; // 10 seconds

export async function checkDatabase() {
    try {
        logger.info("Checking database connection...");
        await prisma.$connect();
        await prisma.$queryRaw`SELECT 1`;

        setDbReady(true);
        logger.info("🟢 Database healthy");
    } catch (err) {
        setDbReady(false);
        logger.error("🔴 Database unavailable");
    }
}

export function startDbHealthCheck() {
    // run immediately
    checkDatabase();

    // keep checking
    setInterval(checkDatabase, CHECK_INTERVAL);
}