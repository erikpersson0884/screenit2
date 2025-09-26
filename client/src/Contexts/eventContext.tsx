import React from "react";

type EventsContextType = {
    events: IEvent[];
};

const EventContext = React.createContext<EventsContextType | undefined>(undefined);

const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ events, setEvents] = React.useState<IEvent[]>([]);

    React.useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/images/getFutureImages")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to fetch events");
                }
            })
            .then((data) => setEvents(data))
            .catch((error) => console.error(error.message));
    }, []);


    return (
        <EventContext.Provider value={{ events }}>
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