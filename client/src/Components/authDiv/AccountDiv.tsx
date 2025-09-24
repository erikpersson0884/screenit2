import React from "react";
import { useAuthContext } from "../../Contexts/AuthContext";


const AccountDiv: React.FC = () => {
    const { logout, user } = useAuthContext();
    
    if (!user) { // will never happen, but typescript wants this check
        return null;
    }

    return (
        <div className="popupbox">
            <h2>{user.username}</h2>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default AccountDiv;
