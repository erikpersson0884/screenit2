import IUser from '../IUser.js';

export interface IUserService {
    checkIfUserExists(id: string): Promise<boolean>;
    
    getAllUsers(): Promise<IUser[]>;
    getUserByUsername(username: string): Promise<IUser | null>;
    createUser(name: string, password: string): Promise<IUser>;
    getUserById(id: string): Promise<IUser | null>;
    updateUser(id: string, newUsername?: string, newPassword?: string): Promise<IUser | null>;
    deleteUser(id: string): Promise<IUser | null>;
}

export default IUserService;