import React from "react";
import "./PosterDisplay.css";
import { useGalleryContext } from "@/contexts/GalleryContext";
import { useEventContext } from "@/contexts/EventContext";


const PosterDisplay: React.FC = () => {
    const { postDisplayTime, showEventTitle } = useGalleryContext();
    const { visibleEvents: events } = useEventContext();

    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        if (events.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % events.length);
        }, postDisplayTime * 1000);

        return () => clearInterval(interval);
    }, [events, postDisplayTime]);

    if (events.length === 0) {
        return (
            <div className="postsDisplay">
                <p>No events to display</p>
            </div>
        );
    }

    const currentEvent = events[currentIndex];

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
                <h3>{eventName} - {eventDate}</h3>
            }

            <div className="poster-display">
                <img
                    src={imagePath}
                    alt={`Event poster - ${eventName}`}
                    className="postImage"
                    width={300}
                />
            </div>
        </>
    );
};

export default PosterDisplay;