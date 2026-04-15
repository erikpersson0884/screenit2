import React from "react";
import './UserManager.css';
import { useUsersContext } from "@/contexts/UsersContext";

import accountIcon from '@/assets/account.svg'
import blockIcon from '@/assets/block.svg'
import lockPersonIcon from '@/assets/lock-person.svg'
import unlockIcon from '@/assets/unlock.svg'


interface UserManagerProps {
    users: User[];
}

const UserManager: React.FC<UserManagerProps> = ({users}) => {
    const { updateUser } = useUsersContext()

    const blockUser = async (user: User) => {
        const succes = await updateUser(user.id, !user.blocked)
        if (!succes) alert("Failed to block user")
    }
    
    return (
        <ul className="user-manager manager no-list-styling">
            {users.map((user) => (
                <li key={user.id}>
                    <img src={accountIcon} className='user-image' alt={"Account icon"} width={30}/>
                    <div>
                        <p>{user.username}</p>
                        <p>{user.role}</p>
                    </div>
                    
                    <div className='action-buttons'>
                        <button onClick={() => blockUser(user)} title={"Block user"} >
                            <img src={user.blocked ? lockPersonIcon : unlockIcon} alt="Toggle visibility" width={20} />
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default UserManager;
