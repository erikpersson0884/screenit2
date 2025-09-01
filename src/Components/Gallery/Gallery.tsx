import React from 'react';
import './Gallery.css';
import Sidebar from './Sidebar/Sidebar';
import GallerySettings from './GallerySettings/GallerySettings';
import PostsDisplay from './PostsDisplay/PostsDisplay';
import { useGalleryContext } from '../../Contexts/GalleryContext';

const Gallery: React.FC = () => {
    const { showSidebar } = useGalleryContext();

    return (
        <div className='gallery'>
            {showSidebar && <Sidebar /> }
            <PostsDisplay />
            <GallerySettings />
        </div>
    );
};

export default Gallery;