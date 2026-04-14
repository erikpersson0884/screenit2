import createEventService from "../services/eventService.js";
import { IEventService } from "../models/services/IEventService.js";
import logger from "../lib/logger.js";
import { isDbReady } from "../lib/dbState.js";
import { EventWithRelations } from "../types/types.js";

const eventService: IEventService = createEventService();

const DELETE_OLD_EVENTS_INTERVAL = 24 * 60 * 60 * 1000;

const shouldEventBeDeleted = (event: EventWithRelations): boolean => {
    const now = new Date();
    if (event.date < now) return true;
    else return false;
}

export const deleteOldEvents = async () => {
    try {
        const allEvents = await eventService.getAllEvents();

        const now = new Date();

        for (const event of allEvents) {
            try {
                if (shouldEventBeDeleted(event)) {
                    await eventService.deleteEvent(event.id);
                    logger.info(
                        `Deleted old event: ${event.name} (${event.id})`
                    );
                }
            } catch (err) {
                logger.error(
                    `Failed to delete event ${event.id}`,
                    err
                );
            }
        }
    } catch (error) {
        logger.error("DeleteOldEvents job failed (likely DB issue)", error);
    }
};

export const startDeleteOldEventsJob = async () => {
    logger.info("Starting DeleteOldEvents job");
    const safeRun = async () => {
        try {
            if (!isDbReady()) {
                logger.warn("DB not ready → skipping group sync");
                return;
            }
            await deleteOldEvents();
        } catch (err) {
            logger.error("Unhandled job crash prevented", err);
        }
    };

    safeRun();
    setInterval(safeRun, DELETE_OLD_EVENTS_INTERVAL);
};

export default startDeleteOldEventsJob;
