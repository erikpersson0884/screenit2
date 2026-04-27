import React from 'react';
import './Sidebar.css';
import { useEventContext } from '@/contexts/EventContext';
import { useGalleryContext } from '@/contexts/GalleryContext';

const Sidebar: React.FC = () => {
    const { visibleEvents: events } = useEventContext();
    const { showSidebar } = useGalleryContext();

    if (!showSidebar) return null;

    const Content = () => {
        if (events.length === 0) return <p>No upcoming events.</p>;
        else return (
            <ul>
                {events.filter(event => event.name !== "").map((event: IEvent) => (
                    <li key={event.id}>
                        <p className='event-name'>{event.name}</p>
                        <p>{event.date.toLocaleDateString('en-CA')}</p>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <aside className="sidebar popup">
            <h2>Upcoming events</h2>
            <hr />
            <Content />
        </aside>
    );
};

export default Sidebar;