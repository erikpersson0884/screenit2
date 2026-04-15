import React from 'react'
import "./AccountPopup.css"

import { useAuthContext } from "@/contexts/AuthContext"
import { useEventContext } from "@/contexts/EventContext"
import { useModalContext } from '@/contexts/ModalContext'
import EventManager from '@/components/eventManger/EventManager'


const AccountPopup: React.FC = () => {
    const { logout, currentUser, isAuthenticated } = useAuthContext()
    const { events } = useEventContext()
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



    const UploadedEvents: React.FC = () => (
        <>
            <h2>Your uploaded posters</h2>
            <EventManager events={filterEventsUserMayModify} />
            <hr />
        </>
    )

    return (
        <div className="account-popup popup" onClick={(e) => e.stopPropagation()}>
            {filterEventsUserMayModify.length > 0 ? 
                <UploadedEvents /> : 
                <p>You currently have no<br/>uploaded posters :</p>
            }
            <button onClick={() => {logout(); closeModal();}}>Log out</button>
        </div>
    )
}

export default AccountPopup
