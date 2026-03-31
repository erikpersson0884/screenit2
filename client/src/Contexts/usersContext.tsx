import { createContext, useContext, useState, ReactNode } from 'react';
import userApi from '../api/userApi';
import { useEffect } from 'react';

interface UsersContextType {
    loadingUsers: boolean;
    users: User[];
    getUserById: (id: string) => User;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
    const [ users, setUsers ] = useState<User[]>([]);
    const [ loadingUsers, setLoadingUsers ] = useState<boolean>(true);

    const fetchUsers = async () => {
        try {
            const fetchedUsers = await userApi.fetchUsers();
            const myUsers: User[] = fetchedUsers.map((user: any) => {
                user.isAdmin = user.role === 'admin';
                return user;
            });

            setUsers(myUsers);
            setLoadingUsers(false);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const getUserById = (id: string): User => {
        const user: User | undefined = users.find(user => user.id === id);
        if (!user) throw new Error(`User with id ${id} not found`);
        else return user;
    }

    return (
        <UsersContext.Provider value={{ loadingUsers, users, getUserById }}>
            {children}
        </UsersContext.Provider>
    );
};

export const useUsersContext = (): UsersContextType => {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};