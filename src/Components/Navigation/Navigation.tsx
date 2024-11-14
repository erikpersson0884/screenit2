
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import { useAuthContext } from '../../Contexts/AuthContext';

const Navigation: React.FC = () => {
    const { isLoggedIn } = useAuthContext();


    return (
        <nav className='navigation'>
            <Link to="/">Gallery</Link>
            <Link to="/upload">Upload</Link>
            <Link to="/manageUsers">Manage Users</Link>
            {isLoggedIn ?
                <Link to="account" >Account</Link>
                :
                <Link to="/login">Login</Link>
            }
        </nav>
    );
}

export default Navigation;