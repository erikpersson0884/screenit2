import { createContext, useContext, useState, ReactNode } from 'react';
import userApi from '../api/userApi';
import { useEffect } from 'react';

interface UsersContextType {
    loadingUsers: boolean;
    users: IUser[];
    getUserById: (id: string) => IUser;
    createUser: (username: string, password: string) => Promise<boolean>;
    updateUser: (userId: string, username: string, password: string) => Promise<boolean>;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
    const [ users, setUsers ] = useState<IUser[]>([]);
    const [ loadingUsers, setLoadingUsers ] = useState<boolean>(true);

    const fetchUsers = async () => {
        try {
            const fetchedUsers = await userApi.fetchUsers();
            const myUsers: IUser[] = fetchedUsers.map((user: any) => {
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

    const getUserById = (id: string): IUser => {
        const user: IUser | undefined = users.find(user => user.id === id);
        if (!user) throw new Error(`User with id ${id} not found`);
        else return user;
    }

    const createUser = async (username: string, password: string): Promise<boolean> => {
        try {
            const success = await userApi.createUser(username, password);
            if (success) {
                await fetchUsers();
                return success;
            }
            else {
                console.error('Login failed after user creation');
                return false;
            }
        } catch (error) {
            console.error('Failed to create user:', error);
            return false;
        }
    }

    const updateUser = async (userId: string, username: string, password: string): Promise<boolean> => {
        try {
            const user = getUserById(userId);
            if (!user) throw new Error(`User with id ${userId} not found`);

            await userApi.updateUser(
                userId,
                username === user.username ? undefined : username,
                password === "" ? undefined : password
            );
            fetchUsers(); // Refresh the users list after updating
            return true;
        } catch (error) {
            console.error('Failed to update user:', error);
            return false;
        }
    }

    return (
        <UsersContext.Provider value={{ loadingUsers, users, getUserById, createUser, updateUser }}>
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