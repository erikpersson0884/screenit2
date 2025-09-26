import React from 'react';
import './PostsDisplay.css';
import { useGalleryContext } from '../../../contexts/galleryContext';
import { useEventContext } from '../../../contexts/eventContext';

const EventsDisplay: React.FC = () => {

    const { postDisplayTime } = useGalleryContext();
    const { events } = useEventContext();

    const [postImagePath, setEventImagePath] = React.useState<string>(""); 

    
    return (
        <div className="postsDisplay">
            <img src={postImagePath} alt="post image" width={300}/>
        </div>
    );
};

export default EventsDisplay;