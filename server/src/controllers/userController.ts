import { Request, Response } from "express";
import { createUserService } from "../services/userService.js";
import { IUserController } from "../models/controllers/IUserController.js";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.js";
import { UserResponseSchema, UserResponseArraySchema } from '../models/dtos/UserDTOs.js';
import { sendValidatedResponse } from "../middleware/validateResponseMiddleware.js";
import { MissingUserIDError, UnauthorizedActionError } from "../errors/CustomErrors.js";
import { User } from "../../prisma/generated/prisma/client.js";

const userService = createUserService();

export const createUserController = (service = userService): IUserController => ({
    getAllUsers: async (req: Request, res: Response) => {
        const users: User[] = await service.getAllUsers();
        sendValidatedResponse(res, UserResponseArraySchema, users);
    },

    getUserById: async (req: Request, res: Response) => {
        const userId: string = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const user: User | null = await service.getUserById(userId);
        if (user) {
            sendValidatedResponse(res, UserResponseSchema, user);
        }
        else res.status(404).json({ error: `User with id ${userId} not found` });
    },

    getCurrentUser: (req: AuthenticatedRequest, res: Response) => {
        const user: User = req.user;
        if (user) sendValidatedResponse(res, UserResponseSchema, user);
    },
});
