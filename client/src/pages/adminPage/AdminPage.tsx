import React from "react";
import './AdminPage.css';
import { useAuthContext } from "@/contexts/AuthContext";
import { useEventContext } from "@/contexts/EventContext";
import { useUsersContext } from "@/contexts/UsersContext";
import { Link } from "react-router-dom";

import EventManager from "@/components/eventManger/EventManager";
import UserManager from "@/components/userManager/UserManager";

const AdminPage: React.FC = () => {
    const { currentUser } = useAuthContext();
    const { events } = useEventContext();
    const { users } = useUsersContext();

    const [ userSearchTerm, setUserSearchTerm ] = React.useState("");
    const [ eventSearchTerm, setEventSearchTerm ] = React.useState("");

    
    if (!currentUser) return <p className="not-allowed-to-view-text">Only logged in users are allowed to view this page, you are not logged in, this implicates that you are not allowed to view this page (maths)</p>
    if (!currentUser.isAdmin) return <p className="not-allowed-to-view-text">Only admins are allowed to view this page, you are not an admin, this implicates that you are not allowed to view this page (maths)</p>
    return (
        <div className="admin-page">
            <Link to="/" className="back-to-gallery-link">
                <button>Back to Gallery</button>
            </Link>

            <h1>Admin Page</h1>
            <h2>Welcome back {currentUser.username}!</h2>

            <div className="admin-panel">
                <div>
                    <h3>Events</h3>
                    <input 
                        type="text" 
                        placeholder="Search events..."
                        className="searchbar"
                        value={eventSearchTerm}
                        onChange={(e) => setEventSearchTerm(e.target.value)}
                    />
                    <EventManager events={events.filter((event) => event.name.includes(eventSearchTerm))} />
                </div>

                <div>
                    <h3>Users</h3>
                    <input 
                        type="text" 
                        placeholder="Search users..." 
                        className="searchbar"
                        value={userSearchTerm}
                        onChange={(e) => setUserSearchTerm(e.target.value)}
                    />
                    <UserManager users={users.filter((user) => user.username.includes(userSearchTerm))} />
                </div>
            </div>
            
        </div>
    );
}

export default AdminPage;
