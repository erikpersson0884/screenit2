import createEventService from "../services/eventService.js";
import { IEventService } from "../models/services/IEventService.js";
import logger from "../lib/logger.js";
import { isDbReady } from "../dbState.js";

const eventService: IEventService = createEventService();

const DELETE_OLD_EVENTS_INTERVAL = 24 * 60 * 60 * 1000;

export const deleteOldEvents = async () => {
    try {
        if (!isDbReady()) {
            logger.warn("DB not ready → skipping group sync");
            return;
        }
        
        const allEvents = await eventService.getAllEvents();

        if (!allEvents || allEvents.length === 0) {
            logger.info("No events found or DB was unavailable, aborting deleteOldEvents job");
            return;
        }

        const now = new Date();

        for (const event of allEvents) {
            try {
                if (event.date < now) {
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

export const startDeleteOldEventsJob = () => {
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
