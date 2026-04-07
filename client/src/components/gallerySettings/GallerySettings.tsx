import React from 'react';
import './GallerySettings.css';
import Modal from '@/components/modal/Modal';

import { useGalleryContext } from '@/contexts/GalleryContext';


interface GallerySettingsProps {
    // Define any props for the component here
}

const GallerySettings: React.FC<GallerySettingsProps> = () => {
    const { 
        // Poster settings
        postDisplayTime, 
        setEventDisplayTime,

        fetchInterval,
        setFetchInterval,

        // Hubbenråttan settings
        setShowHubbenRattan, 
        showHubbenRattan,

        hubbenRattanDisplayTime, 
        setHubbenRattanDisplayTime,

        hubbenRattanDisplayInterval,
        setHubbenRattanDisplayInterval,

        // Other settings
        showSidebar,
        setShowSidebar,
    } = useGalleryContext();


    // Poster settings components
    const EventDisplayTimeSetting: React.FC = () => (
        <div className='input-group'>
            <label htmlFor="postDisplayTime">Event Display Time (seconds):</label>
            <input type="number" id="postDisplayTime" name="postDisplayTime" value={postDisplayTime} onChange={(e) => setEventDisplayTime(Number(e.target.value))}/>
        </div>
    );

    const EventFetchIntervalSetting: React.FC = () => (
        <div className='input-group'>
            <label htmlFor="fetchInterval">Fetch Interval (minutes):</label>
            <input type="number" id="fetchInterval" name="fetchInterval" value={fetchInterval} onChange={(e) => setFetchInterval(Number(e.target.value))}/>
        </div>
    );

    // Sidebar settings components
    const ShowSidebarSetting: React.FC = () => (
        <div className='input-group'>
            <label htmlFor="showSidebarButton">Show Sidebar:</label>
            <input
                type='checkbox'
                id='showSidebarButton'
                name='showSidebar'
                checked={showSidebar}
                onChange={(e) => setShowSidebar(!showSidebar)}
            />
        </div>
    );

    // Hubbenråttan settings components
    const ShowHubbenRattanSetting: React.FC = () => (
        <div className='input-group'>
            <label htmlFor="showHubbenrattanButton">Show Hubbenråttan:</label>
            <input 
                type='checkbox' 
                id='showHubbenrattanButton'
                name='showHubbenrattanButton'
                checked={showHubbenRattan}
                onChange={() => setShowHubbenRattan(!showHubbenRattan)}
            />
        </div>
    );

    const HubbenRattanDisplayTimeSetting: React.FC = () => (
        <div className='input-group'>
            <label htmlFor="hubben-rattan-display-time">Hubbenråttan displaytime:</label>
            <input type='number' id='hubben-rattan-display-time' name='hubben-rattan-display-time' value={hubbenRattanDisplayTime} onChange={(e) => setHubbenRattanDisplayTime(Number(e.target.value))}/>
        </div>
    )

    const HubbenRattanDisplayIntervalSetting: React.FC = () => (
        <div className='input-group'>
            <label htmlFor="hubben-rattan-display-interval">Hubbenråttan display interval:</label>
            <input type='number' id='hubben-rattan-display-interval' name='hubben-rattan-display-interval' value={hubbenRattanDisplayInterval} onChange={(e) => setHubbenRattanDisplayInterval(Number(e.target.value))}/>
        </div>
    )

    return (
        <div className='gallerySettings popup' onClick={(e) => e.stopPropagation()}>
            <h2>Gallery Settings</h2>

            <hr /> 
            <EventDisplayTimeSetting />

            <EventFetchIntervalSetting />

            <hr />

            <ShowSidebarSetting />

            <hr />

            <ShowHubbenRattanSetting />

            {showHubbenRattan && <HubbenRattanDisplayTimeSetting />}
            {showHubbenRattan && <HubbenRattanDisplayIntervalSetting />}
        </div>
    );
};

export default GallerySettings;
