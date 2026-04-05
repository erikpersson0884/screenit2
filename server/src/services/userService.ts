import { PrismaClient, Role } from "../../prisma/generated/prisma/client.js";
import prismaClient from "../lib/prisma.js";
import { User } from '../../prisma/generated/prisma/client.js';
import { IUserService } from '../models/services/IUserService.js';
import { UserNotFoundError } from '../errors/UserNotFoundError.js';
import { UserAlreadyExistsError } from '../errors/UserAlreadyExistsError.js';

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

    // OAuth related methods
    async getUserById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        return user ? user : null;
    }

    async checkIfUserExists(id: string): Promise<boolean> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        return user !== null;
    }

    async createUser(id: string, username: string): Promise<User> {
        if (await this.checkIfUserExists(id)) {
            throw new UserAlreadyExistsError(`User with username ${username} already exists`);
        }

        const role: Role = 'user'; // Default role, can be adjusted as needed

        await this.prisma.user.create({
            data: {
                id,
                username,
                role, // Default role, can be adjusted as needed
            },
        });

        const newUser = await this.getUserById(id);
        if (!newUser) {
            throw new UserNotFoundError(`Failed to create user with username ${username}`);
        }

        return newUser;
    }
}

export const createUserService = (prisma: PrismaClient = prismaClient): IUserService => {
    return new UserService(prisma);
}
