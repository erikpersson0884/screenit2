import React from 'react';
import './Sidebar.css';
import { usePostsContext } from '../../../Contexts/PostsContext';
import { useGalleryContext } from '../../../Contexts/GalleryContext';

const Sidebar: React.FC = () => {
    const { posts } = usePostsContext();
    const { showSidebar } = useGalleryContext();

    if (!showSidebar) return null;

    return (
        <aside className="sidebar popupbox">
            <h2>Upcoming events</h2>
            <hr />
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <p>{post.date}</p>
                        <p>{post.eventName}</p>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;