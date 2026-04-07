import { PrismaClient, Role } from "../../prisma/generated/prisma/client.js";
import prismaClient from "../lib/prisma.js";
import { User } from '../../prisma/generated/prisma/client.js';
import { IUserService } from '../models/services/IUserService.js';
import { UserAlreadyExistsError, UserNotFoundError } from '../errors/CustomErrors.js';
import { ClientApi, UserInfo, GroupWithPost, GroupId as GammaGroupId, UserId as GammaUserId } from "gammait";

if (!process.env.GAMMA_PRE_SHARED_AUTH) throw new Error("Gamma API configuration is missing. Please set PRE_SHARED_AUTH in your environment variables.");
const clientapi = new ClientApi({
        // The authorization header that identifies our client with Gamma.
        authorization: process.env.GAMMA_PRE_SHARED_AUTH,
})

export class UserService implements IUserService {
    private prisma: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    async getAllUsers(): Promise<User[]> {
        const users: User[] = await this.prisma.user.findMany();
        return users;
    }

    async getUserByUsername(username: string): Promise<User | null> {
        const user: User | null = await this.prisma.user.findUnique({
            where: { username: username },
        });
        return user;
    }

    async getUserByGammaId(gammaId: GammaGroupId): Promise<User | null> {
        const user: User | null = await this.prisma.user.findFirst({
            where: {
                gammaId,
            },
        });
        return user;
    }

    async getUserById(id: string): Promise<User | null> {
        const user: User | null = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
            include: {
                groups: true,
            },
        });

        if (!user) return null;
        
        return user;
    }

    async checkIfUserExists(id: string): Promise<boolean> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        return user !== null;
    }

    async createUser(gammaId: string, username: string): Promise<User> {
        if (await this.checkIfUserExists(gammaId)) {
            throw new UserAlreadyExistsError(`User with gamma id ${gammaId} and/or ${username} already exists`);
        }

        const role: Role = 'user'; // Default role, can be adjusted as needed

        const createdUser = await this.prisma.user.create({
            data: {
                gammaId,
                username,
                role, // Default role, can be adjusted as needed
            },
        });

        if (!createdUser) {
            throw new UserNotFoundError(`Failed to create user with username ${username}`);
        }

        return createdUser;
    }

    async updateUser(id: string, data: Partial<{ username: string }>): Promise<User> {
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data,
        });

        if (!updatedUser) {
            throw new UserNotFoundError(`Failed to update user with id ${id}`);
        }   
        return updatedUser;
    }
}

export const createUserService = (prisma: PrismaClient = prismaClient): IUserService => {
    return new UserService(prisma);
}
