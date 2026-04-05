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
        const user = await userApi.getCurrentUser();
        user.isAdmin = user.role === 'admin';
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

    const authenticate = async (): Promise<void> => {
        window.location.replace("/api/auth/gamma");
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('authToken'); 
    };

    return (
        <AuthContext.Provider value={{ currentUser, isAuthenticated, logout, authenticate, setAuthToken }}>
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