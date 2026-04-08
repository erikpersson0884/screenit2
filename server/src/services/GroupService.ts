import { PrismaClient, Group } from "../../prisma/generated/prisma/client.js";
import prismaClient from "../lib/prisma.js";
import { GroupWithPost, UserWithGroups } from "gammait";
import { IGroupService } from "../models/services/IGroupService.js";

export class GroupService implements IGroupService {
    private prisma: PrismaClient;

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

    async syncUserGroups(userId: string, groups: GroupWithPost[]) {
        const groupsToSync = groups.filter(
            g => g.superGroup.type === "committee"
        );

        await this.upsertGroups(groupsToSync);

        await this.prisma.user.update({
            where: { id: userId },
            data: {
                groups: {
                    set: groupsToSync.map(g => ({ id: g.id })),
                },
            },
        });
    }
}

export const createGroupService = (prisma: PrismaClient = prismaClient): IGroupService => {
    return new GroupService(prisma);
}
