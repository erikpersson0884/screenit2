import React from 'react';
import './GallerySettings.css';
import Modal from '@/components/modal/Modal';

import { useGalleryContext } from '@/contexts/GalleryContext';

interface GallerySettingsProps {
    // Define any props for the component here
}

const GallerySettings: React.FC<GallerySettingsProps> = () => {
    const { 
        // Which popups to show
        showSettings,
        setShowSettings,

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

    if (!showSettings) return null;

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
        <Modal onClose={() => setShowSettings(false)}>
            <div className='gallerySettings popupbox' onClick={(e) => e.stopPropagation()}>
                <h2>Gallery Settings</h2>

                <hr /> 
                <div className='input-group'>
                    <label htmlFor="postDisplayTime">Event Display Time (seconds):</label>
                    <input
                        type="number"
                        id="postDisplayTime"
                        name="postDisplayTime"
                        value={postDisplayTime}
                        onChange={(e) => setEventDisplayTime(Number(e.target.value))}
                    />
                </div>

                <div className='input-group'>
                    <label htmlFor="fetchInterval">Fetch Interval (minutes):</label>
                    <input
                        type="number"
                        id="fetchInterval"
                        name="fetchInterval"
                        value={fetchInterval}
                        onChange={(e) => setFetchInterval(Number(e.target.value))}
                    />
                </div>

                <hr />

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

                <hr />

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

                {showHubbenRattan && <HubbenRattanDisplayTimeSetting />}
                {showHubbenRattan && <HubbenRattanDisplayIntervalSetting />}
            </div>
        </Modal>
    );
};

export default GallerySettings;
