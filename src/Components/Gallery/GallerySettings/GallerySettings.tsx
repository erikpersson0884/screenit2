import React from 'react';
import './GallerySettings.css';

import { useGalleryContext } from '../../../Contexts/GalleryContext';

interface GallerySettingsProps {
    // Define any props for the component here
}

const GallerySettings: React.FC<GallerySettingsProps> = (props) => {
    const { postDisplayTime, setPostDisplayTime, showSettings, setShowHubbenRattan, showHubbenRattan } = useGalleryContext();

    if (!showSettings) return null;

    return (
        <div className='gallerySettings'>
            <h2>Gallery Settings</h2>

            <hr /> 
            <div className='inputDiv'>
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

            <div className='inputDiv'>
                <label htmlFor="showSidebarButton">Show Sidebar:</label>
                <input type='checkbox' id='showSidebarButton' name='showSidebar' />
            </div>

            <hr />

            <div className='inputDiv'>
                <label htmlFor="showHubbenrattanButton">Show Hubbenråttan:</label>
                <input type='checkbox' id='showHubbenrattanButton' name='showHubbenrattanButton' checked={showHubbenRattan} onChange={() => setShowHubbenRattan(!showHubbenRattan)} />
            </div>
        </div>
    );
};

export default GallerySettings;