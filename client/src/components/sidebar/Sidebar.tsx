import React from 'react';
import './Sidebar.css';
import { useEventContext } from '@/contexts/EventContext';
import { useGalleryContext } from '@/contexts/GalleryContext';

const Sidebar: React.FC = () => {
    const { visibleEvents: events } = useEventContext();
    const { showSidebar } = useGalleryContext();

    if (!showSidebar) return null;

    return (
        <aside className="sidebar popup">
            <h2>Upcoming events</h2>
            <hr />
            <ul>
                {events.filter(event => event.name !== "").map((event: IEvent) => (
                    <li key={event.id}>
                        <p className='event-name'>{event.name}</p>
                        <p>{event.date.toLocaleDateString('en-CA')}</p>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;