import { Group, User } from '../../../prisma/generated/prisma/client.js';

export interface IGroupService {
    getAllGroups(): Promise<Group[]>;
    getGroupById(id: string): Promise<Group | null>;
    getGroupsForUser(userId: string): Promise<Group[]>;

    syncUserGroups(user: User): Promise<void>;
}
