
import createEventService from "../services/eventService.js";

const eventService = createEventService();
const DELETE_OLD_EVENTS_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const deleteOldEvents = async () => {
    try {
        const allEvents = await eventService.getAllEvents();
        const now = new Date();
        for (const event of allEvents) {
            if (event.date < now) {
                await eventService.deleteEvent(event.id);
                console.log(`Deleted old event named: ${event.name} with id: ${event.id}`);
            }
        }
    } catch (error) {
        console.error("Error deleting old events:", error);
    }
};

export const startDeleteOldEventsJob = () => {
    // Run the job immediately and then every 24 hours
    deleteOldEvents();
    setInterval(deleteOldEvents, DELETE_OLD_EVENTS_INTERVAL);
};

export default startDeleteOldEventsJob;
