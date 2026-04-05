import React from 'react';
import './Sidebar.css';
import { useEventContext } from '@/contexts/EventContext';
import { useGalleryContext } from '@/contexts/GalleryContext';

const Sidebar: React.FC = () => {
    const { events } = useEventContext();
    const { showSidebar } = useGalleryContext();

    if (!showSidebar) return null;

    return (
        <aside className="sidebar popup">
            <h2>Upcoming events</h2>
            <hr />
            <ul>
                {events.map((event: IEvent) => (
                    <li key={event.id}>
                        <p>{event.date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        <p>{event.name}</p>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;