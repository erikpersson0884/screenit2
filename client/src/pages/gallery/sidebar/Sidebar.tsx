import React from 'react';
import './Sidebar.css';
import { useEventContext } from '../../../contexts/eventContext';
import { useGalleryContext } from '../../../contexts/galleryContext';

const Sidebar: React.FC = () => {
    const { events } = useEventContext();
    const { showSidebar } = useGalleryContext();

    if (!showSidebar) return null;

    return (
        <aside className="sidebar popupbox">
            <h2>Upcoming events</h2>
            <hr />
            <ul>
                {events.map((event: IEvent) => (
                    <li key={event.id}>
                        <p>{event.date.toString()}</p>
                        <p>{event.name}</p>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;