import createEventService from "../services/eventService.js";


const SYNC_CHALMERS_EVENTS_INTERVAL = 60 * 60 * 1000; // every hour

const eventService = createEventService;

export const startSyncChalmersEventsJob = () => {
    const sync = async () => {
        try {
            await eventService.syncEventsFromChalmersIT();
            console.log("Synced Chalmers IT events");
        } catch (err) {
            console.error("Failed to sync Chalmers IT events:", err);
        }
    };

    // Run immediately
    sync();

    // Then repeat every hour
    setInterval(sync, SYNC_CHALMERS_EVENTS_INTERVAL);
};