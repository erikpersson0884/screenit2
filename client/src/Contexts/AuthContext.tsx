import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { API_URL } from '../util';
import { User } from '../types';

interface AuthContextType {
    isLoggedIn: boolean;
    login: (username: string, password: string) => void;
    logout: () => void;
    user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            setIsLoggedIn(true);
            // Optionally, fetch user data here using the token
        }
    }, []);

    const login = (username: string, password: string) => {
        fetch( "api/auth/login", {
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
            const token: string = data.adminkey;
            localStorage.setItem("token", token);
            setToken(token);
            setIsLoggedIn(true);
            const fetchedUser: User = { id: data.user.id, username: data.user.username, type: data.user.accountType };
            setUser(fetchedUser);
        })
        .catch((error) => {
            console.error("Login failed", error);
        }
        )
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
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