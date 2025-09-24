
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import { useAuthContext } from '../../Contexts/AuthContext';
import { useGalleryContext } from '../../Contexts/GalleryContext';

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