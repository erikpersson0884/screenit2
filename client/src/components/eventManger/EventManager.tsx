import React from "react";
import './EventManager.css';
import { useEventContext } from "@/contexts/EventContext";

import deleteIcon from '@/assets/delete.svg'
import visibleIcon from '@/assets/visible.svg'
import NotVisibleIcon from '@/assets/not-visible.svg'


interface EventManagerProps {
    events: IEvent[];
}

const EventManager: React.FC<EventManagerProps> = ({events}) => {
    const { deleteEvent, updateEvent } = useEventContext()


    const changeEventVisibility = async (eventId: string) => {
        const eventToUpdate: IEvent | undefined = events.find(event => event.id === eventId);
        if (!eventToUpdate) {
            console.error(`Event with id ${eventId} not found`);
            return;
        }

        const newVisibility = !eventToUpdate.visible;

        const success = await updateEvent(eventId, eventToUpdate.date, eventToUpdate.name, newVisibility);
        if (!success) alert('Failed to update event visibility');
    };

    return (
        <ul className="event-manager no-list-styling">
            {events.map((event) => (
                <li key={event.id}>
                    <img src={event.imagePath} className='event-image' alt={event.name} width={30}/>
                    <div>
                        <p>{event.name}</p>
                        <p>{event.date.toLocaleDateString()}</p>
                    </div>
                    
                    <div className='action-buttons'>

                        <button title="Hide event" onClick={() => changeEventVisibility(event.id)}>
                            <img src={event.visible ? visibleIcon : NotVisibleIcon} alt="Toggle visibility" width={20}/>
                        </button>

                        {event.type === "userCreated" ?
                            <button title="Delete event?" onClick={() => deleteEvent(event.id)}>
                                <img src={deleteIcon} alt="Delete" width={20}/>
                            </button> : null
                        }
                    </div>
                    
                </li>
            ))}
        </ul>
    )
}

export default EventManager;
