import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/authContext';
import { useUsersContext } from '../../contexts/usersContext';
import ActionPopupWindow from '../actionPopupWindow/ActionPopupWindow';


interface UpdateUserPopupProps {
    onClose: () => void;
    user: IUser | null;
}

const UpdateUserPopup: React.FC<UpdateUserPopupProps> = ({onClose, user}) => {
    const { currentUser } = useAuthContext();
    const { updateUser } = useUsersContext();

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorText, setErrorText ] = useState<string | undefined>(undefined);

    const handleUpdate = async () => {
        if (!currentUser) return;
        if (currentUser.username == username && password !== '') {
            setErrorText('Inga ändringar gjorda');
            return;
        }

        if (password.length > 0 && password.length < 4) {
            console.log(password.length);
            setErrorText('Lösenordet måste vara minst 4 tecken långt');
            return;
        }

        if (!user) return;

        const successfullUpdate = await updateUser(user.id, username, password);
        if (!successfullUpdate) {
            setErrorText('Något gick fel, försök igen senare');
            return;
        }
        handleClose();
    };

    const handleClose = () => {
        setUsername('');
        setPassword('');
        setErrorText(undefined);
        onClose();
    }

    return (
        <ActionPopupWindow 
            isOpen={user !== null} 
            onClose={handleClose} 
            onAccept={handleUpdate} 
            acceptButtonText="Uppdatera" 
            title="Uppdatera användare" 
            errorText={errorText }
            acceptButtonDisabled={username === '' && password === ''}
        >
            <div>
                <label htmlFor="username">Nytt användarnamn</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Nytt användarnamn"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="off"
                />
            </div>
            <div>
                <label htmlFor="password">Nytt lösenord</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Nytt lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="off"
                />
            </div>
        </ActionPopupWindow>
    )
};

export default UpdateUserPopup;