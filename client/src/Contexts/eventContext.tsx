import React from "react";
import eventApi from "../api/eventApi";

type EventsContextType = {
    events: IEvent[];
    createEvent: (date: Date, name: string, imageFile: File) => Promise<boolean>;
    updateEvent: (eventId: string, newDate: Date, newName: string) => Promise<boolean>;
    deleteEvent: (eventId: string) => void;
};

const EventContext = React.createContext<EventsContextType | undefined>(undefined);

const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ events, setEvents ] = React.useState<IEvent[]>([]);

    const getEventFromId = (eventId: String): IEvent => {
        const event: IEvent | undefined = events.find((event) => event.id === eventId);
        if (!event) throw new Error("Event not found");
        return event;
    }
    
    React.useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const events = await eventApi.fetchEvents();
            setEvents(events);
        } catch (error) {
            console.error("Failed to fetch events:", error);
        }
    };

    const createEvent = async (date: Date, name: string, imageFile: File): Promise<boolean> => {
        try {
            await eventApi.createEvent(date, name, imageFile);
            fetchEvents();
            return true;
        }
        catch (error) {
            console.error("Failed to create event:", error);
        }
        return false;
    };

    const updateEvent = async (eventId: string, newDate: Date, newName: string): Promise<boolean> => {
        const updatedEvent: Partial<IEvent> = { };
        const currentEvent: IEvent = getEventFromId(eventId);

        if (newDate !== currentEvent.date) updatedEvent.date = newDate;
        if (newName !== currentEvent.name) updatedEvent.name = newName;

        if (Object.keys(updatedEvent).length === 0) return false; // No changes to update

        try {
            eventApi.updateEvent(eventId, updatedEvent);
            fetchEvents();
            return true
        }
        catch (error) {
            console.error("Failed to update event:", error);
        }
        return false;
    };

    const deleteEvent = async (eventId: string) => {
        try {
            await eventApi.deleteEvent(eventId);
            fetchEvents();
        }
        catch (error) {
            console.error("Failed to delete event:", error);
        }
    };

    return (
        <EventContext.Provider value={{ events, createEvent, updateEvent, deleteEvent }}>
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