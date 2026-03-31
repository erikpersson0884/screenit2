import React from 'react';
import './Gallery.css';

import Sidebar from './sidebar/Sidebar';
import GallerySettings from './gallerySettings/GallerySettings';
import EventsDisplay from './postsDisplay/PostsDisplay';
import UploadEventDiv from '../../Components/createEventPopup/CreateEventPopup';

const Gallery: React.FC = () => {

    return (
        <div className='gallery'>
            <Sidebar />
            <EventsDisplay />
            <GallerySettings />
            <UploadEventDiv />
        </div>
    );
};

export default Gallery;