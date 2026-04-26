import { PrismaClient, Group, User } from "../../prisma/generated/prisma/client.js";
import prismaClient from "../lib/prisma.js";
import { IGroupService } from "../models/services/IGroupService.js";
import logger from "../lib/logger.js";
import { isDbReady } from "../lib/dbState.js";
import { env } from "../config/env.js";
import { ClientApi, GroupWithPost, GroupId as GammaGroupId, UserId as GammaUserId } from "gammait";


export class GroupService implements IGroupService {
    private prisma: PrismaClient;
    private readonly gammaApi = new ClientApi({
        authorization: env.GAMMA_PRE_SHARED_AUTH
    });

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }


    async getAllGroups(): Promise<Group[]> {
        const groups: Group[] | null = await this.prisma.group.findMany();
        return groups;
    }

    async getGroupById(id: string): Promise<Group | null> {
        const group: Group | null = await this.prisma.group.findUnique({
            where: { id },
        });
        return group;
    }

    async getGroupsForUser(userId: string): Promise<Group[]> {
        const userWithGroups = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { groups: true },
        });

        return userWithGroups?.groups || [];
    }

    async upsertGroups(groups: GroupWithPost[]): Promise<void> {
        await Promise.all(
             groups.map(group =>
                this.prisma.group.upsert({
                    where: { id: group.id },
                    update: {
                        name: group.name,
                        prettyName: group.prettyName,
                    },
                    create: {
                        id: group.id,
                        name: group.name,
                        prettyName: group.prettyName,
                        superGroupId: group.superGroup.id,
                    },
                })
            )
        )
    }

    async syncUserGroups(user: User): Promise<void> {
        if (!isDbReady()) {
            logger.warn("DB not ready → skipping group sync");
            return;
        }

        const gammaGroups: GroupWithPost[] = await this.gammaApi.getGroupsFor(user.gammaId as GammaUserId);
        const groupsToSync = gammaGroups.filter(
            g => g.superGroup.type === "committee"
        );

        await this.upsertGroups(groupsToSync);

        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                groups: {
                    set: groupsToSync.map(group => ({ id: group.id })),
                },
            },
        });
    }
}

export const createGroupService = (prisma: PrismaClient = prismaClient): IGroupService => {
    return new GroupService(prisma);
}

export default createGroupService;