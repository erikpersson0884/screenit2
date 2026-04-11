import React from "react";
import eventApi from "@/api/eventApi";
import { useGalleryContext } from "./GalleryContext";

type EventsContextType = {
    events: IEvent[];
    visibleEvents: IEvent[];
    fetchEvents: () => void;
    createEvent: (date: Date, name: string, imageFile: File, groupId: string[]) => Promise<boolean>;
    updateEvent: (eventId: string, newDate: Date, newName: string, visible: boolean) => Promise<boolean>;
    deleteEvent: (eventId: string) => void;
};

const EventContext = React.createContext<EventsContextType | undefined>(undefined);


const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { fetchInterval } = useGalleryContext();
    const [ events, setEvents ] = React.useState<IEvent[]>([]);
    const visibleEvents = React.useMemo(() => events.filter(event => event.visible), [events]);

    const getEventFromId = (eventId: String): IEvent => {
        const event: IEvent | undefined = events.find((event) => event.id === eventId);
        if (!event) throw new Error("Event not found");
        return event;
    }
    
    React.useEffect(() => {
        fetchEvents();

        const intervalId = setInterval(() => { // Periodically fetch events to ensure data is up-to-date
            fetchEvents();
        }, fetchInterval * 60 * 1000); // Convert minutes to milliseconds

        return () => clearInterval(intervalId);
    }, []);

    const fetchEvents = async () => {
        try {
            const events: IEvent[] = await eventApi.fetchEvents();
            setEvents(events);
        } catch (error) {
            console.error("Failed to fetch events:", error);
        }
    };

    const createEvent = async (date: Date, name: string, imageFile: File, groupIds: string[]): Promise<boolean> => {
        try {
            await eventApi.createEvent(date, name, imageFile, groupIds);
            fetchEvents();
            return true;
        }
        catch (error) {
            console.error("Failed to create event:", error);
        }
        return false;
    };

    const updateEvent = async (eventId: string, newDate: Date, newName: string, visible: boolean): Promise<boolean> => {
        const updatedEvent: Partial<IEvent> = { };
        const currentEvent: IEvent = getEventFromId(eventId);

        if (newDate !== currentEvent.date) updatedEvent.date = newDate;
        if (newName !== currentEvent.name) updatedEvent.name = newName;
        if (visible !== currentEvent.visible) updatedEvent.visible = visible;

        if (Object.keys(updatedEvent).length === 0) return false; // No changes to update

        try {
            await eventApi.updateEvent(eventId, updatedEvent);
            fetchEvents();
            return true
        }
        catch (error) {
            console.error("Failed to update event:", error);
        }
        return false;
    };

    const deleteEvent = async (eventId: string) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;
        
        try {
            await eventApi.deleteEvent(eventId);
            fetchEvents();
        }
        catch (error) {
            console.error("Failed to delete event:", error);
        }
    };

    return (
        <EventContext.Provider value={{
            events, 
            visibleEvents,
            fetchEvents,
            createEvent, 
            updateEvent, 
            deleteEvent 
        }}>
            {children}
        </EventContext.Provider>
    );
};

const useEventContext = () => {
    const context = React.useContext(EventContext);
    if (context === undefined) {
        throw new Error("useEvents must be used within a EventsProvider");
    }
    return context;
};

export { EventProvider, useEventContext };