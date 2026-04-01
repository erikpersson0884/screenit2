import React from 'react';
import './PostsDisplay.css';
import { useGalleryContext } from '../../../contexts/GalleryContext';
import { useEventContext } from '../../../contexts/EventContext';

const EventsDisplay: React.FC = () => {

    const { postDisplayTime } = useGalleryContext();
    const { events } = useEventContext();

    const [postImagePath, setEventImagePath] = React.useState<string>(""); 

    return (
        <div className="postsDisplay">
            {events.length > 0 ? (
                <img src={`/api/uploads/${events[0].imagePath}`} alt="event poster" width={300} />
            ) : (
                <p>No events to display</p>
            )}
        </div>
    );
};

export default EventsDisplay;