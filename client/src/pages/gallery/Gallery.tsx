import React from 'react';
import './Gallery.css';

import Sidebar from './sidebar/Sidebar';
import GallerySettings from './gallerySettings/GallerySettings';
import EventsDisplay from '../../Components/postsDisplay/PostsDisplay';
import UploadEventDiv from '../../Components/createEventPopup/CreateEventPopup';
import AccountPopup from '../../Components/accountPopup/AccountPopup';

const Gallery: React.FC = () => {

    return (
        <div className='gallery'>
            <Sidebar />
            <EventsDisplay />
            <GallerySettings />
            <UploadEventDiv />
            <AccountPopup />
        </div>
    );
};

export default Gallery;