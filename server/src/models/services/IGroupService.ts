import { Group } from '../../../prisma/generated/prisma/client.js';
import { GroupWithPost } from "gammait";

export interface IGroupService {
    getAllGroups(): Promise<Group[]>;
    getGroupById(id: string): Promise<Group | null>;
    getGroupsForUser(userId: string): Promise<Group[]>;

    syncUserGroups(userId: string, groups: GroupWithPost[]): Promise<void>;
}
