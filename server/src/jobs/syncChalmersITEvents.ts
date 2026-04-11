import createEventService from "../services/eventService.js";
import logger from "../lib/logger.js";
import { EventWithRelations } from "../types/types.js";
import { isDbReady } from "../dbState.js";

const SYNC_CHALMERS_EVENTS_INTERVAL = 60 * 60 * 1000; // 1 hour
const eventService = createEventService();

export const startSyncChalmersEventsJob = () => {
    const sync = async () => {
        if (!isDbReady()) {
            logger.warn("DB not ready → skipping group sync");
            return;
        }
        try {
            const result: EventWithRelations[] =
                await eventService.syncEventsFromChalmersIT();

            logger.info(
                `Synced ${result?.length ?? 0} Chalmers IT events successfully`
            );
        } catch (err) {
            logger.error("Failed to sync Chalmers IT events", err);
        }
    };

    const safeRun = async () => {
        try {
            await sync();
        } catch (err) {
            logger.error("Sync job crashed unexpectedly", err);
        }
    };

    safeRun();
    setInterval(safeRun, SYNC_CHALMERS_EVENTS_INTERVAL);
};