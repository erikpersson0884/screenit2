import React from 'react';
import './Toolbar.css';
import { useAuthContext } from '@/contexts/AuthContext';
import { useGalleryContext } from '@/contexts/GalleryContext';

const Navigation: React.FC = () => {
    const { isAuthenticated, authenticate } = useAuthContext();
    const { setShowSettings, showSettings, setShowAccount, showAccount, setShowUpload, showUpload } = useGalleryContext();

    return (
        <div className='toolbar'>
            {isAuthenticated && <button onClick={() => setShowUpload(!showUpload)}>Upload</button>}

            <button className='car' onClick={() => setShowSettings(!showSettings)}>Settings</button>

            <button onClick={isAuthenticated ? () => setShowAccount(!showAccount) : authenticate}>
                {isAuthenticated ? 'Account' : 'Login'}  
            </button>
        </div>
    );
}

export default Navigation;