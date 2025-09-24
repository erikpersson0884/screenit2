import React from 'react';
import './Gallery.css';

import Sidebar from './Sidebar/Sidebar';
import GallerySettings from './GallerySettings/GallerySettings';
import AccountDiv from '../authDiv/AuthDiv';
import PostsDisplay from './PostsDisplay/PostsDisplay';
import UploadPostDiv from '../UploadPostDiv/UploadPostDiv';

const Gallery: React.FC = () => {

    return (
        <div className='gallery'>
            <Sidebar />
            <PostsDisplay />
            <GallerySettings />
            <AccountDiv />
            <UploadPostDiv />
        </div>
    );
};

export default Gallery;