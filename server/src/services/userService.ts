import { PrismaClient, User, Role } from "../../prisma/generated/prisma/client.js";
import prismaClient from "../lib/prisma.js";
import { IUserService } from '../models/services/IUserService.js';
import { UserAlreadyExistsError, UserNotFoundError } from '../errors/CustomErrors.js';
import { ClientApi, User as GammaUser, GroupWithPost, GroupId as GammaGroupId, UserId as GammaUserId } from "gammait";
import { env } from "../config/env.js";
import { isDbReady } from "../lib/dbState.js";
import logger from "../lib/logger.js";


export class UserService implements IUserService {
    private prisma: PrismaClient;
    private gammaApi = new ClientApi({
        authorization: env.GAMMA_PRE_SHARED_AUTH,
})

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    async getAllUsers(): Promise<User[]> {
        const users: User[] = await this.prisma.user.findMany({
            orderBy: [
                { role: 'asc' },
                { username: 'asc'},
            ],
        });
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
        const user: User | null = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        return user !== null;
    }

    private async getUserRoleFromGamma(gammaId: GammaUserId): Promise<Role> {
        const userAuthorities: string[] = await this.gammaApi.getAuthoritiesFor(gammaId);
        let role: Role = 'user'; // Default role
        userAuthorities.forEach((authority) => {
            if (authority === 'admin') {
                role = 'admin';
            }
        });
        return role;
    }

    async createUser(gammaId: GammaUserId, username: string): Promise<User> {
        if (await this.checkIfUserExists(gammaId)) {
            throw new UserAlreadyExistsError(`User with gamma id ${gammaId} and/or ${username} already exists`);
        }

        let role: Role = await this.getUserRoleFromGamma(gammaId);
        logger.info(`Assigning role ${role} to user with gammaId ${gammaId} and username ${username}`);

        const createdUser = await this.prisma.user.create({
            data: {
                gammaId,
                username,
                role,
            },
        });

        if (!createdUser) {
            throw new UserNotFoundError(`Failed to create user with username ${username}`);
        }

        return createdUser;
    }

    async updateUser(id: string, data: Partial<{ username: string, blocked: boolean }>): Promise<User> {
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data,
        });

        if (!updatedUser) {
            throw new UserNotFoundError(`Failed to update user with id ${id}`);
        }   
        return updatedUser;
    }

    async upsertUser(gammaUser: GammaUser): Promise<void> {
        const role: Role = await this.getUserRoleFromGamma(gammaUser.id);

        await this.prisma.user.upsert({
            where: { gammaId: gammaUser.id },
            update: {
                username: gammaUser.nick,
            },
            create: {
                gammaId: gammaUser.id,
                username: gammaUser.nick,
                role,
            },
        });
    }

    async syncUserWithGamma(gammaId: GammaUserId): Promise<void> {
        if (!isDbReady()) {
            logger.warn("DB not ready → skipping user sync");
            return;
        }

        const externalUser: GammaUser = await this.gammaApi.getUser(gammaId);

        // 1. Upsert user itself
        await this.upsertUser(externalUser);

        // 2. Optionally sync relations (like groups)
        const groups = await this.gammaApi.getGroupsFor(externalUser.id);

        const groupsToSync = groups.filter(
            g => g.superGroup.type === "committee"
        );

        // 3. Sync user-group relation
        await this.prisma.user.update({
            where: { gammaId: externalUser.id },
            data: {
                groups: {
                    set: groupsToSync.map(group => ({ id: group.id })),
                },
            },
        });
    }
}

export const createUserService = (prisma: PrismaClient = prismaClient): IUserService => {
    return new UserService(prisma);
}
