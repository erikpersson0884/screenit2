import React from 'react';
import './GallerySettings.css';

import { useGalleryContext } from '../../../Contexts/GalleryContext';

interface GallerySettingsProps {
    // Define any props for the component here
}

const GallerySettings: React.FC<GallerySettingsProps> = () => {
    const { postDisplayTime, 
        setPostDisplayTime, 
        showSettings, 
        setShowHubbenRattan, 
        showHubbenRattan, 
        hubbenRattanDisplayTime, 
        setHubbenRattanDisplayTime,
        setShowSidebar
    } = useGalleryContext();

    if (!showSettings) return null;

    return (
        <div className='gallerySettings popupbox'>
            <h2>Gallery Settings</h2>

            <hr /> 
            <div className='input-group'>
                <label htmlFor="postDisplayTime">Post Display Time (seconds):</label>
                <input
                    type="number"
                    id="postDisplayTime"
                    name="postDisplayTime"
                    value={postDisplayTime}
                    onChange={(e) => setPostDisplayTime(Number(e.target.value))}
                />
            </div>

            <hr />

            <div className='input-group'>
                <label htmlFor="showSidebarButton">Show Sidebar:</label>
                <input
                    type='checkbox'
                    id='showSidebarButton'
                    name='showSidebar'
                    onChange={(e) => setShowSidebar((e.target as HTMLInputElement).checked)}
                />
            </div>

            <hr />

            <div className='input-group'>
                <label htmlFor="showHubbenrattanButton">Show Hubbenråttan:</label>
                <input type='checkbox' id='showHubbenrattanButton' name='showHubbenrattanButton' checked={showHubbenRattan} onChange={() => setShowHubbenRattan(!showHubbenRattan)} />
            </div>

            <div className='input-group'>
                <label htmlFor="hubben-rattan-display-time">Hubbenråttan displaytime:</label>
                <input type='number' id='hubben-rattan-display-time' name='hubben-rattan-display-time' value={hubbenRattanDisplayTime} onChange={(e) => setHubbenRattanDisplayTime(Number(e.target.value))}/>
            </div>
        </div>
    );
};

export default GallerySettings;