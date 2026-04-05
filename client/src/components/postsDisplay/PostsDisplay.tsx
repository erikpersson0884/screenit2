import React from 'react';
import './PostsDisplay.css';
import { useGalleryContext } from '@/contexts/GalleryContext';
import { useEventContext } from '@/contexts/EventContext';

const EventsDisplay: React.FC = () => {
    const { postDisplayTime } = useGalleryContext();
    const { events } = useEventContext();

    const [currentIndex, setCurrentIndex] = React.useState<number>(0);

    React.useEffect(() => {
        if (events.length === 0) return;

        const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
        }, postDisplayTime * 1000);

        return () => clearInterval(interval); // cleanup on unmount
    }, [events, postDisplayTime]);

    if (events.length == 0) {
        return (
            <div className="postsDisplay">
                <p>No events to display</p>
            </div>
        );
    }

    return (
        <div className="posts-display">
            <img src={"api/uploads/" + events[currentIndex].imagePath} alt="Event poster" className="postImage"  width={300}/>
        </div>
    );
};

export default EventsDisplay;
