
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import { useAuthContext } from '../../contexts/authContext';
import { useGalleryContext } from '../../contexts/galleryContext';

const Navigation: React.FC = () => {
    const { isLoggedIn } = useAuthContext();
    const { setShowSettings, showSettings, setShowAccount, showAccount, setShowUpload, showUpload } = useGalleryContext();


    return (
        <nav className='navigation'>
            {isLoggedIn && <button onClick={() => setShowUpload(!showUpload)}>Upload</button>}
            <button>
                <Link to="/manageUsers">Manage Users</Link>
            </button>
            <button onClick={() => setShowSettings(!showSettings)}>Settings</button>

            <button onClick={() => setShowAccount(!showAccount)}>
                {isLoggedIn ? 'Account' : 'Login'}  
            </button>
        </nav>
    );
}

export default Navigation;