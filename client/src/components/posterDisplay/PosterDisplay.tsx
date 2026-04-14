import React from "react";
import "./PosterDisplay.css";
import { useGalleryContext } from "@/contexts/GalleryContext";
import { useEventContext } from "@/contexts/EventContext";

const PosterDisplay: React.FC = () => {
    const { postDisplayTime } = useGalleryContext();
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

    const imageAlt = `Event poster - ${currentEvent.name}`;

    return (
        <div className="poster-display">
            <img
                src={imagePath}
                alt={imageAlt}
                className="postImage"
                width={300}
            />
        </div>
    );
};

export default PosterDisplay;