import React from 'react';
import './Navigation.css';
import { useAuthContext } from '@/contexts/AuthContext';
import { useGalleryContext } from '@/contexts/GalleryContext';

const Navigation: React.FC = () => {
    const { isAuthenticated, authenticate, logout } = useAuthContext();
    const { setShowSettings, showSettings, setShowAccount, showAccount, setShowUpload, showUpload } = useGalleryContext();

    return (
        <nav className='navigation'>
            {isAuthenticated && <button onClick={() => setShowUpload(!showUpload)}>Upload</button>}

            <button onClick={() => setShowSettings(!showSettings)}>Settings</button>

            <button onClick={isAuthenticated ? () => setShowAccount(!showAccount) : authenticate}>
                {isAuthenticated ? 'Account' : 'Login'}  
            </button>
        </nav>
    );
}

export default Navigation;