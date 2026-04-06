import React from 'react';
import './Gallery.css';

import Sidebar from '@/components/sidebar/Sidebar';
import GallerySettings from '@/components/gallerySettings/GallerySettings';
import EventsDisplay from '@/components/posterDisplay/PosterDisplay';
import CreateEventPopup from '@/components/createEventPopup/CreateEventPopup';
import AccountPopup from '@/components/accountPopup/AccountPopup';
import HubbenRattan from '@/components/hubbenRattan/HubbenRattan';

const Gallery: React.FC = () => {

    return (
        <div className='gallery'>
            <Sidebar />
            <EventsDisplay />
            <GallerySettings />
            <CreateEventPopup />
            <AccountPopup />
            <HubbenRattan />
        </div>
    );
};

export default Gallery;