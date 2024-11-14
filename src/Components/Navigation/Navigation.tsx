
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
    return (
        <nav>
            <Link to="/">Gallery</Link>
            <Link to="/upload">Upload</Link>
            <Link to="/manageUsers">Manage Users</Link>
        </nav>
    );
}

export default Navigation;