import { Request, Response } from "express";
import { createUserService } from "../services/userService.js";
import { IGroupController } from "../models/controllers/IGroupController.js";

const userService = createUserService();

export const createGroupController = (service = userService): IGroupController => ({
    getAllGroups: async (req: Request, res: Response) => {
        // Implementation to get all groups
    }

    getGroupById: async (req: Request, res: Response) => {
    
});
