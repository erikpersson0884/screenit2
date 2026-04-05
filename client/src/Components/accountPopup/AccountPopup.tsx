import React from 'react'
import './AccountPopup.css'

import { useAuthContext } from "@/contexts/AuthContext"
import { useEventContext } from "@/contexts/EventContext"
import { useGalleryContext } from '@/contexts/GalleryContext'

import deleteIcon from '@/assets/delete.svg'
import editIcon from '@/assets/edit.svg'

const AccountPopup = () => {
    const { logout, currentUser } = useAuthContext()
    const { events, deleteEvent } = useEventContext()
    const { showAccount } = useGalleryContext()

    if (!showAccount) return null;

    return (
        <div className="account-popup popupbox">
            <h2>Your uploaded posters</h2>
            <ul className="no-list-styling">
                {events.filter((event) => event.createdById === currentUser?.id).map((event) => (
                    <li key={event.id}>
                        <img src={"/api/uploads/" + event.imagePath} className='event-image' alt={event.name} width={30}/>
                        <div>
                            <p>{event.name}</p>
                            <p>{event.date.toLocaleDateString()}</p>
                        </div>
                        
                        {/* <button>
                            <img src={editIcon} alt="Edit" width={20}/>
                        </button> */}
                        <button onClick={() => deleteEvent(event.id)}>
                            <img src={deleteIcon} alt="Delete" width={20}/>
                        </button>
                    </li>
                ))}
            </ul>

            <hr />
            <button onClick={logout}>Log out</button>
        </div>
    )
}

export default AccountPopup
