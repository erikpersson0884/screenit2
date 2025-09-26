import React, { createContext, useEffect, useContext, useState, ReactNode } from 'react';
import authApi from '../api/authApi';
import userApi from '../api/userApi';
import { setAuthToken } from '../api/axiosInstance';
import { useUsersContext } from './usersContext';

interface AuthContextType {
    currentUser: IUser | null;
    isLoggedIn: boolean;
    register: (username: string, password: string) => Promise<boolean>;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;

    showAuthPopup: boolean;
    setShowAuthPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { createUser } = useUsersContext();

    const [ currentUser, setCurrentUser ] = useState<IUser | null>(null);
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(!!currentUser);
    const [ showAuthPopup, setShowAuthPopup ] = React.useState(false);

    const getCurrentUser = async (): Promise<void> => {
        const user: IUser | null = await userApi.getCurrentUser();
        if (!user) {
            setCurrentUser(null);
            return;
        }

        user.isAdmin = user.role === 'admin';
        setCurrentUser(user);
    }

    
    useEffect(() => {
        setIsLoggedIn(!!currentUser);
    }, [currentUser]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                await getCurrentUser();
            } catch (error) {
                console.error('Failed to fetch current user', error);
            }
        };
        if (localStorage.getItem('authToken')) {
            fetchUser();
        }
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            const token: string = await authApi.login(username, password);
            if (token) {
                setAuthToken(token);
                getCurrentUser();
                return true;
            }
        } catch (error: unknown) {
            console.error('Login failed', error);
        }
        return false;
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('authToken'); 
    };

    const register = async (username: string, password: string): Promise<boolean> => {
        try {
            const success = await createUser(username, password);
            if (success) {
                return await login(username, password);
            }
        } catch (error) {
            console.error('Registration failed', error);
        }
        return false;
    };
            

    return (
        <AuthContext.Provider value={{ currentUser, isLoggedIn, login, logout, showAuthPopup, setShowAuthPopup, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};