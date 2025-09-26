import { useAuthContext } from "../../contexts/authContext";
import { useState, useEffect } from "react";
import ActionPopupWindow from "../actionPopupWindow/ActionPopupWindow";
import UpdateUserPopup from "../updateUserPopup/UpdateUserPopup";
import { useUsersContext } from "../../contexts/usersContext";
import './AuthPopup.css';
import { Link } from "react-router-dom";

const errortextDisplayTime = 5000; // milliseconds

enum PopupType {
    LOGIN = 'login',
    REGISTER = 'register',
    PROFILE = 'profile',
    UPDATE = 'update',
}

const AuthPopup: React.FC = () => {
    const { login, logout, currentUser, showAuthPopup, setShowAuthPopup } = useAuthContext();
    const { createUser } = useUsersContext();

    const [ username, setUsername ] = useState(currentUser ? currentUser.username : '');
    const [ password, setPassword ] = useState('');
    const [ errorText, setErrorText ] = useState<string | null>(null);

    const [popupType, setPopupType] = useState<PopupType>(PopupType.LOGIN);

    useEffect(() => {
        if (currentUser) setPopupType(PopupType.PROFILE);
        else setPopupType(PopupType.LOGIN);
    }, [currentUser]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (popupType === PopupType.LOGIN) handleLogin();
        else if (popupType === PopupType.REGISTER) handleCreation();
    }

    const inputs = () => (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Användarnamn</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Användarnamn"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Lösenord</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {errorText && <p className="error-message">{errorText}</p>}
        </form>
    );

    const handleClose = () => {
        setUsername(currentUser ? currentUser.username : '');
        setPassword('');
        setErrorText(null);
        setShowAuthPopup(false);
        if (currentUser) setPopupType(PopupType.PROFILE);
        else setPopupType(PopupType.LOGIN);
    };

    useEffect(() => {
        if (errorText) {
            const timer = setTimeout(() => {
                setErrorText(null);
            }, errortextDisplayTime);

            return () => clearTimeout(timer);
        }
    }, [errorText]);


    const handleLogin = async () => {
        const successfullLogin: boolean = await login(username, password);
        if (!successfullLogin) setErrorText("Felaktigt användarnamn eller lösenord");
        else handleClose();
    }

    if (!currentUser && popupType === PopupType.LOGIN) {
        return (
            <ActionPopupWindow
                isOpen={showAuthPopup}
                onClose={handleClose}
                onAccept={handleLogin}
                title="Logga in"
                acceptButtonText="Logga in"
                className="auth-popup"
            >
                {inputs()}
                <p>Har du inget konto? <span className="link" onClick={() => setPopupType(PopupType.REGISTER)}>Registrera</span></p>
            </ActionPopupWindow>
        );
    }

    const handleLogout = () => {
        logout();
        handleClose();
    }
    
    
    if ( currentUser && popupType === PopupType.PROFILE) {
        return (
            <ActionPopupWindow 
                isOpen={showAuthPopup}
                onClose={handleClose}
                onAccept={handleLogout}
                title={currentUser.username}
                acceptButtonText="Logga ut"
                className="auth-popup"
            >
                <button onClick={() => setPopupType(PopupType.UPDATE)}>
                    Uppdatera uppgifter
                </button>
                
                { currentUser.isAdmin &&
                    <Link to="/user-management">
                        <button onClick={handleClose}>
                            Hantera Användare
                        </button>
                    </Link>
                }
            </ActionPopupWindow>
        );
    }

    const handleCreation = async () => {
        if (username.length <1 ) setErrorText("Användarnamn måste vara minst 1 tecken långt");
        else if (password.length < 4) setErrorText("Lösenord måste vara minst 4 tecken långt");
        else {
            const successfullCreation: boolean = await createUser(username, password);
            if (!successfullCreation) setErrorText("Det gick inte att skapa användaren, försök igen senare");
            else handleClose();
        }
    }

    if (popupType === PopupType.REGISTER) return (
        <ActionPopupWindow
            isOpen={showAuthPopup}
            onClose={handleClose}
            onAccept={handleCreation}
            title="Registrera"
            acceptButtonText="Registrera"
            className="auth-popup"
            acceptButtonDisabled={username === '' || password === ''}
        >
            {inputs()}
            <p>Har du redan ett konto? <span className="link" onClick={() => setPopupType(PopupType.LOGIN)}>Logga in</span></p>
        </ActionPopupWindow>
    );

    if (popupType === PopupType.UPDATE) {
        return (
            <UpdateUserPopup 
                onClose={handleClose}
                user={currentUser}
            />
        );
    }


}

export default AuthPopup;
