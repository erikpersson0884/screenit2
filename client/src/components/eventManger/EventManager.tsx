import React from "react";
import './EventManager.css';
import { useEventContext } from "@/contexts/EventContext";
import { useUsersContext } from "@/contexts/UsersContext";
import { useAuthContext } from "@/contexts/AuthContext";

import deleteIcon from '@/assets/delete.svg'
import visibleIcon from '@/assets/visible.svg'
import NotVisibleIcon from '@/assets/not-visible.svg'


interface ByUserProps {
    createdById: string;
    event: IEvent;
}
const ByUser: React.FC<ByUserProps> = ({createdById, event}) => {
    const { getUserByGammaId } = useUsersContext()

    if (event.type === "userCreated") return <p>Av {getUserByGammaId(createdById).username}</p>
    else return <p>Från Chalmers.it</p>
}

interface EventManagerProps {
    events: IEvent[];
}

const EventManager: React.FC<EventManagerProps> = ({events}) => {
    const { deleteEvent, updateEvent } = useEventContext()
    const { currentUser } = useAuthContext()

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

    const getImagePath = (event: IEvent): string => {
        return event.type === "userCreated" ? 
            `/api/uploads/${event.imagePath}`
            : event.imagePath;
    }

    return (
        <ul className="event-manager manager no-list-styling">
            {events.map((event) => (
                <li key={event.id}>
                    <img src={getImagePath(event)} className='event-image' alt={event.name} width={30}/>
                    <div>
                        <p>{event.name}</p>
                        <p>{event.date.toLocaleDateString('en-CA')}</p>
                        { currentUser && currentUser.role == "admin" && <ByUser createdById={event.createdById} event={event}/> }
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
