import React from 'react';
import './Gallery.css';

import Sidebar from './sidebar/Sidebar';
import GallerySettings from './gallerySettings/GallerySettings';
import EventsDisplay from '@/components/postsDisplay/PostsDisplay';
import UploadEventDiv from '@/components/createEventPopup/CreateEventPopup';
import AccountPopup from '@/components/accountPopup/AccountPopup';

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