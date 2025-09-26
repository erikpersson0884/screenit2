import React from 'react';
import './Gallery.css';

import Sidebar from './sidebar/Sidebar';
import GallerySettings from './gallerySettings/GallerySettings';
import AccountDiv from '../../components/authPopup/AuthPopup';
import EventsDisplay from './postsDisplay/PostsDisplay';
import UploadEventDiv from '../../components/createEventPopup/CreateEventPopup';

const Gallery: React.FC = () => {

    return (
        <div className='gallery'>
            <Sidebar />
            <EventsDisplay />
            <GallerySettings />
            <AccountDiv />
            <UploadEventDiv />
        </div>
    );
};

export default Gallery;