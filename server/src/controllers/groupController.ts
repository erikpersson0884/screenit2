import { Request, Response } from "express";
import { createGroupService } from "../services/groupService.js";
import { IGroupController } from "../models/controllers/IGroupController.js";
import { IGroupService } from "../models/services/IGroupService.js";
import { sendValidatedResponse } from "../middleware/validateResponseMiddleware.js";
import { GroupResponseSchema } from "../models/dtos/GroupDTO.js";
import { Group } from "../../prisma/generated/prisma/client.js";
import CustomError from "../errors/CustomErrors.js";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.js";


class GroupController implements IGroupController {
    private groupService: IGroupService;

    constructor(groupService: IGroupService) {
        this.groupService = groupService;
    } 

    async getAllGroups(req: Request, res: Response): Promise<void> {
        const groups: Group[] = await this.groupService.getAllGroups()
        sendValidatedResponse(res, GroupResponseSchema, groups);
    }

    async getGroupById(req: Request, res: Response): Promise<void> {
        const groupId: string = req.params.id as string;
        const group: Group | null = await this.groupService.getGroupById(groupId);
        if (!group) throw new CustomError(404, "Group not found");
    }

    async getCurrentUserGroups(req: AuthenticatedRequest, res: Response): Promise<void> {
        const userId: string = req.user.id;
        const groups: Group[] = await this.groupService.getGroupsForUser(userId);
        sendValidatedResponse(res, GroupResponseSchema, groups);
    }
}

export const createGroupController = (groupService: IGroupService = createGroupService()): IGroupController => {
    return new GroupController(groupService);
}

export default createGroupController;
