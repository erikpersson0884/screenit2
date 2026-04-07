import React from 'react';
import './Gallery.css';

import EventsDisplay from '@/components/posterDisplay/PosterDisplay';
import Sidebar from '@/components/sidebar/Sidebar';
import HubbenRattan from '@/components/hubbenRattan/HubbenRattan';

const Gallery: React.FC = () => {

    return (
        <div className='gallery'>
            <EventsDisplay />
            <Sidebar />
            <HubbenRattan />
        </div>
    );
};

export default Gallery;
