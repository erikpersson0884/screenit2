import { Request, Response } from "express";
import { createUserService } from "../services/userService.js";
import { IUserController } from "../models/controllers/IUserController.js";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.js";
import { UserResponseSchema, UserResponseArraySchema } from '../models/dtos/UserDTOs.js';
import { sendValidatedResponse } from "../middleware/validateResponseMiddleware.js";
import { UnauthorizedActionError, UserNotFoundError } from "../errors/CustomErrors.js";
import { User } from "../../prisma/generated/prisma/client.js";
import { UpdateUserRequestDTO } from '../models/dtos/UserDTOs.js';
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

    updateUser: async (req: AuthenticatedRequest<UpdateUserRequestDTO, {id: string}>, res: Response) => {
        const authenticatedUser: User = req.user;
        const userIdToUpdate: string = req.params.id;
        if (!(await userService.checkIfUserExists(userIdToUpdate))) throw new UserNotFoundError(undefined, userIdToUpdate);

        if (!(authenticatedUser.id == userIdToUpdate || authenticatedUser.role == "admin")) throw new UnauthorizedActionError();

        const updateData: UpdateUserRequestDTO = req.body;

        const updatedUser: User = await service.updateUser(userIdToUpdate, updateData);

        if (updatedUser) {
            sendValidatedResponse(res, UserResponseSchema, updatedUser);
        }
    }
});
