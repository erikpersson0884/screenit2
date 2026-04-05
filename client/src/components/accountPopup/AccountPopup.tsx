import React from 'react'
import './AccountPopup.css'
import Modal from '@/components/modal/Modal'

import { useAuthContext } from "@/contexts/AuthContext"
import { useEventContext } from "@/contexts/EventContext"
import { useGalleryContext } from '@/contexts/GalleryContext'

import deleteIcon from '@/assets/delete.svg'
import editIcon from '@/assets/edit.svg'

const AccountPopup: React.FC = () => {
    const { logout, currentUser } = useAuthContext()
    const { events, deleteEvent } = useEventContext()
    const { showAccount, setShowAccount } = useGalleryContext()

    if (!showAccount) return null;

    const userHasUploadedEvents = events.some((event) => event.createdById === currentUser?.id);

    const uploadedEvents = (
        <>
            <h2>Your uploaded posters</h2>

            <ul className="no-list-styling">
                {events.filter((event) => event.createdById === currentUser?.id).map((event) => (
                    <li key={event.id}>
                        <img src={"/api/uploads/" + event.imagePath} className='event-image' alt={event.name} width={30}/>
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
        <Modal onClose={() => setShowAccount(false)}>
            <div className="account-popup popupbox" onClick={(e) => e.stopPropagation()}>
                
                {userHasUploadedEvents ? uploadedEvents : <p>You currently have no<br/>uploaded posters :(</p>}

                <button onClick={logout}>Log out</button>
            </div>
        </Modal>
    )
}

export default AccountPopup
