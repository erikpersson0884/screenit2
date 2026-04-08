import React from 'react'
import './AccountPopup.css'

import { useAuthContext } from "@/contexts/AuthContext"
import { useEventContext } from "@/contexts/EventContext"
import { useModalContext } from '@/contexts/ModalContext'

import deleteIcon from '@/assets/delete.svg'
import editIcon from '@/assets/edit.svg'

const AccountPopup: React.FC = () => {
    const { logout, currentUser, isAuthenticated } = useAuthContext()
    const { events, deleteEvent } = useEventContext()
    const { closeModal } = useModalContext()
    const [ filterEventsUserMayModify, setFilterEventsUserMayModify ] = React.useState(events);

    if (!isAuthenticated || !currentUser) return <div>Accountpopup was opened when user was not logged in, this should not be possible... Magic?</div>;

    React.useEffect(() => {
        if (!currentUser) return;

        const filtered = events.filter(event =>
            event.createdById === currentUser.gammaId ||
            event.byGroups?.some(group => currentUser.groups.some(userGroup => userGroup.id === group.id))
        );

        console.log("Filtered events for user:", filtered);

        setFilterEventsUserMayModify(filtered);
    }, [events, currentUser]);


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
                            {/* <button>
                                <img src={editIcon} alt="Edit" width={20}/>
                            </button> */}
                            <button onClick={() => deleteEvent(event.id)}>
                                <img src={deleteIcon} alt="Delete" width={20}/>
                            </button>
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
