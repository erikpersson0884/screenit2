import { User } from '../../../prisma/generated/prisma/client.js';

export interface IUserService {
    checkIfUserExists(id: string): Promise<boolean>;
    
    getAllUsers(): Promise<User[]>;
    getUserByUsername(username: string): Promise<User | null>;
    createUser(id: string, username: string): Promise<User>;
    getUserById(id: string): Promise<User | null>;
}

export default IUserService;