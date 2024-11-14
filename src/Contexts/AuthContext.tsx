import { createContext, useState, useContext, ReactNode } from 'react';
import { API_URL } from '../util';

interface AuthContextType {
    isLoggedIn: boolean;
    login: (username: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (username: string, password: string) => {
        
        fetch(API_URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                    
                } else {
                    alert("Login failed");
                    throw new Error("Login failed");
                }
            })
            .then((data) => {
                const adminKey: string = data.adminKey;
                localStorage.setItem("adminKey", adminKey);
            })
            .catch((error) => {
                console.error("Login failed", error);
            }
        )
    };

    const logout = () => {
        localStorage.removeItem("adminKey");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};