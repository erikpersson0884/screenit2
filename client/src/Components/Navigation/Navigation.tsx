
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import { useAuthContext } from '../../contexts/AuthContext';
import { useGalleryContext } from '../../contexts/GalleryContext';

const Navigation: React.FC = () => {
    const { isAuthenticated, authenticate, logout } = useAuthContext();
    const { setShowSettings, showSettings, setShowAccount, setShowUpload, showUpload } = useGalleryContext();

    return (
        <nav className='navigation'>
            {isAuthenticated && <button onClick={() => setShowUpload(!showUpload)}>Upload</button>}
            <button>
                <Link to="/manageUsers">Manage Users</Link>
            </button>
            <button onClick={() => setShowSettings(!showSettings)}>Settings</button>

            <button onClick={isAuthenticated ? logout : authenticate}>
                {isAuthenticated ? 'Log out' : 'Login'}  
            </button>
        </nav>
    );
}

export default Navigation;