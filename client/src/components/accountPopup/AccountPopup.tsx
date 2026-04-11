import React from 'react'
import './AccountPopup.css'

import { useAuthContext } from "@/contexts/AuthContext"
import { useEventContext } from "@/contexts/EventContext"
import { useModalContext } from '@/contexts/ModalContext'

import deleteIcon from '@/assets/delete.svg'
import visibleIcon from '@/assets/visible.svg'
import NotVisibleIcon from '@/assets/not-visible.svg'


const AccountPopup: React.FC = () => {
    const { logout, currentUser, isAuthenticated } = useAuthContext()
    const { events, deleteEvent, updateEvent } = useEventContext()
    const { closeModal } = useModalContext()
    const [ filterEventsUserMayModify, setFilterEventsUserMayModify ] = React.useState<IEvent[]>([]);

    if (!isAuthenticated || !currentUser) return <div>Accountpopup was opened when user was not logged in, this should not be possible... Magic?</div>;

    React.useEffect(() => {
        if (!currentUser) return;

        const filterEventsUserMayModify = async () => {
            const filtered: IEvent[] = await events.filter(event =>
                event.createdById === currentUser.gammaId ||
                event.byGroups?.some(group => currentUser.groups.some(userGroup => userGroup.id === group.id))
            );
            setFilterEventsUserMayModify(filtered);
        };

        filterEventsUserMayModify();
    }, [events, currentUser]);

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

    const uploadedEvents = (
        <>
            <h2>Your uploaded posters</h2>

            <ul className="no-list-styling">
                {filterEventsUserMayModify.map((event) => (
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

            <hr />
        </>
    )

    return (
        <div className="account-popup popup" onClick={(e) => e.stopPropagation()}>
            {filterEventsUserMayModify.length > 0 ? uploadedEvents : <p>You currently have no<br/>uploaded posters :(</p>}
            <button onClick={() => {logout(); closeModal();}}>Log out</button>
        </div>
    )
}

export default AccountPopup
