import React from "react";
import "./PosterDisplay.css";
import { useGalleryContext } from "@/contexts/GalleryContext";
import { useEventContext } from "@/contexts/EventContext";


const PosterDisplay: React.FC = () => {
    const { postDisplayTime, showEventTitle } = useGalleryContext();
    const { visibleEvents: events } = useEventContext();

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

    React.useEffect(() => {
        if (events.length === 0) return;

        // clear old interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // start new interval
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % events.length);
        }, postDisplayTime * 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [events, postDisplayTime]);

    React.useEffect(() => {
        if (events.length === 0) return;

        setCurrentIndex((prev) => (prev + 1) % events.length);
    }, [postDisplayTime]);

    const currentEvent = events[currentIndex];

    if (events.length === 0 || !currentEvent) {
        return (
            <div className="postsDisplay">
                <p>No events to display</p>
            </div>
        );
    }

    const imagePath =
        currentEvent.type === "userCreated"
            ? `/api/uploads/${currentEvent.imagePath}`
            : currentEvent.imagePath;

    const eventName = currentEvent.name;
    const eventDate = new Date(currentEvent.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
    });

    return (
        <>
            {showEventTitle && 
                <h1 className="event-title">{eventName} - {eventDate}</h1>
            }

            <div className="poster-display">
                <img
                    src={imagePath}
                    alt={`Event poster - ${eventName}`}
                    className="postImage"

                />
            </div>
        </>
    );
};

export default PosterDisplay;