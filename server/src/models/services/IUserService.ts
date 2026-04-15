import { User, Role } from '../../../prisma/generated/prisma/client.js';
import { UserId as GammaUserId, GroupWithPost } from "gammait";

export interface IUserService {
    checkIfUserExists(id: string): Promise<boolean>;
    
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User | null>;
    getUserByUsername(username: string): Promise<User | null>;
    getUserByGammaId(gammaId: GammaUserId): Promise<User | null>;

    createUser(gammaId: string, username: string): Promise<User>;
    updateUser(id: string, data: Partial<{ username: string, blocked: boolean }>): Promise<User>;
}

export default IUserService;