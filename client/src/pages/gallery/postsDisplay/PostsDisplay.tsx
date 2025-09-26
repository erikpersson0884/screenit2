import React from 'react';
import './PostsDisplay.css';
import { useGalleryContext } from '../../../contexts/galleryContext';
import { useEventContext } from '../../../contexts/eventContext';

const defaultEventImage = 'images/pixelnheart.png';

const EventsDisplay: React.FC = () => {

    const { postDisplayTime, postIndex, setEventIndex } = useGalleryContext();
    const { events } = useEventContext();

    const [postImagePath, setEventImagePath] = React.useState<string>(defaultEventImage); 

    React.useEffect(() => {
        const interval = setInterval(() => {
            setEventIndex((postIndex + 1) % events.length);
            if (events.length > 0) {
                setEventImagePath(events[postIndex].name); // TODO fix this to use image path when backend supports it
            } else {
                setEventImagePath(defaultEventImage);
            }
        }, postDisplayTime);
        return () => clearInterval(interval);
    }, [postIndex, events.length, postDisplayTime]);

    
    return (
        <div className="postsDisplay">
            <img src={postImagePath} alt="post image" width={300}/>
        </div>
    );
};

export default EventsDisplay;