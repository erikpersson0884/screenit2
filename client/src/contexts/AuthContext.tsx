import React, { createContext, useEffect, useContext, useState, ReactNode } from 'react';
import userApi from '@/api/userApi';
import { setAuthToken } from '@/api/axiosInstance';

interface AuthContextType {
    currentUser: User | null;
    isAuthenticated: boolean;

    logout: () => void;
    authenticate: () => Promise<void>;

    setAuthToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState<User | null>(null);
    const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(!!currentUser);

    const getCurrentUser = async (): Promise<void> => {
        const user: User | null = await userApi.getCurrentUser();
        if (user) user.isAdmin = user.role === 'admin';
        setCurrentUser(user);
    }

    
    useEffect(() => {
        setIsAuthenticated(!!currentUser);
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

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (!payload.exp) return;

            const currentTime = Math.floor(Date.now() / 1000);
            const timeUntilExpiry = (payload.exp - currentTime) * 1000; // ms

            if (timeUntilExpiry <= 0) {
                logout();
                return;
            }

            // Set a timer to logout automatically when token expires
            const timer = setTimeout(() => {
                console.log('JWT expired, logging out.');
                logout();
            }, timeUntilExpiry);

            return () => clearTimeout(timer);

        } catch (err) {
            console.error('Error parsing token for auto-logout', err);
            logout();
        }
    }, []);

    const authenticate = async (): Promise<void> => {
        window.location.replace("/api/auth/gamma");
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('authToken'); 
    };

    return (
        <AuthContext.Provider value={{ 
            currentUser, 
            isAuthenticated, 
            logout, 
            authenticate, 
            setAuthToken 
        }}>
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