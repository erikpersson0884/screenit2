
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import { useAuthContext } from '../../Contexts/AuthContext';
import { useGalleryContext } from '../../Contexts/GalleryContext';

const Navigation: React.FC = () => {
    const { isLoggedIn } = useAuthContext();
    const { setShowSettings, showSettings } = useGalleryContext();


    return (
        <nav className='navigation'>
            <button>Upload</button>
            <button>
                <Link to="/manageUsers">Manage Users</Link>
            </button>
            <button onClick={() => setShowSettings(!showSettings)}>Settings</button>

            <button>
                {isLoggedIn ?
                    <Link to="account" >Account</Link>
                    :
                    <Link to="/login">Login</Link>
                }
            </button>
        </nav>
    );
}

export default Navigation;