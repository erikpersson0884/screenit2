import React from 'react';
import './Gallery.css';

import Sidebar from '@/components/sidebar/Sidebar';
import GallerySettings from '@/components/gallerySettings/GallerySettings';
import EventsDisplay from '@/components/postsDisplay/PostsDisplay';
import UploadEventDiv from '@/components/createEventPopup/CreateEventPopup';
import AccountPopup from '@/components/accountPopup/AccountPopup';
import HubbenRattan from '@/components/hubbenRattan/HubbenRattan';

const Gallery: React.FC = () => {

    return (
        <div className='gallery'>
            <Sidebar />
            <EventsDisplay />
            <GallerySettings />
            <UploadEventDiv />
            <AccountPopup />
            <HubbenRattan />
        </div>
    );
};

export default Gallery;