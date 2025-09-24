import { PrismaClient } from "@prisma/client"; 
import prismaClient from "../lib/prisma.js";
import { IUser } from '../models/IUser.js';
import { IUserService } from '../models/services/IUserService.js';
import { UserNotFoundError } from '../errors/UserNotFoundError.js';
import { UserAlreadyExistsError } from '../errors/UserAlreadyExistsError.js';

export class UserService implements IUserService {
    private prisma: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    public async checkIfUserExists(username: string): Promise<boolean> {
        let userExists = await this.prisma.user.findFirst({
            where: { username: username },
        })
        return userExists !== null;
    }

    async getAllUsers(): Promise<IUser[]> {
        const users: IUser[] = await this.prisma.user.findMany();
        return users;
    }

    async getUserById(userId: string): Promise<IUser | null> {
        const user: IUser | null = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        return user;
    }

    async getUserByUsername(username: string): Promise<IUser | null> {
        const user: IUser | null = await this.prisma.user.findUnique({
            where: { username: username },
        });
        return user;
    }

    async createUser(username: string, password: string): Promise<IUser> {
        if (await this.checkIfUserExists(username)) {
            throw new UserAlreadyExistsError(`User with username ${username} already exists`);
        }
        const user: IUser = await this.prisma.user.create({
            data: {
                username,
                password,
            },
        });
        return user;
    }

    async updateUser(id: string, newUsername?: string, newPassword?: string): Promise<IUser> {
        const user: IUser | null = await this.getUserById(id);

        if (user) {
            user.username = newUsername || user.username;
            user.password = newPassword || user.password;
            user.updatedAt = new Date();

            return this.prisma.user.update({
                where: { id },
                data: {
                    username: user.username,
                    password: user.password,
                    updatedAt: user.updatedAt,
                },
            });
        } else throw new UserNotFoundError(`User with id ${id} not found`);
    }

    async deleteUser(userId: string): Promise<IUser> {
        if (await this.checkIfUserExists(userId)) {
            const user: IUser | null = await this.getUserById(userId);
            if (user) {
                return this.prisma.user.delete({
                    where: { id: userId },
                });
            } else throw new UserNotFoundError(`User with id ${userId} not found`);
        }
        else throw new UserNotFoundError(`User with id ${userId} not found`);
    }
}

export const createUserService = (prisma: PrismaClient = prismaClient): IUserService => {
    return new UserService(prisma);
}
