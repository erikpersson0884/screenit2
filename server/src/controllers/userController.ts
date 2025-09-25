import { Request, Response } from "express";
import { createUserService } from "../services/userService.js";
import { IUserController } from "../models/controllers/IUserController.js";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.js";
import { UserResponseSchema, UserResponseArraySchema } from '../models/dtos/UserDTOs.js';
import { sendValidatedResponse } from "../middleware/validateResponseMiddleware.js";
import { MissingUserIDError } from "../errors/MissingUserIDError.js";
import { UnauthorizedActionError } from "../errors/UnauthorizedActionError.js";
import { User } from "@prisma/client";

const userService = createUserService();

export const createUserController = (service = userService): IUserController => ({
    getAllUsers: async (req: Request, res: Response) => {
        const users: User[] = await service.getAllUsers();
        sendValidatedResponse(res, UserResponseArraySchema, users);
    },

    getUserById: async (req: Request, res: Response) => {
        const userId: string = req.params.id;
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

    createUser: async (req: Request, res: Response) => {
        const { username, password } = req.body;
        const user = await service.createUser(username, password);
        sendValidatedResponse(res, UserResponseSchema, user);
    },

    updateUser: async (req: AuthenticatedRequest, res: Response) => {
        const authUser: User = req.user;
        let { username, password }: { username?: string, password?: string} = req.body;
        let userId: string = req.params.id;

        if (!userId) throw new MissingUserIDError();
        
        if (authUser.id !== userId && authUser.role !== 'admin') {
            throw new UnauthorizedActionError('Forbidden: Only admins can update other users');
        }

        const updatedUser: User | null = await service.updateUser(userId, username, password);

        if (updatedUser) sendValidatedResponse(res, UserResponseSchema, updatedUser);
        else res.status(404).json({ error: `User with id ${userId} not found` });
    },

    deleteUser: async (req: AuthenticatedRequest, res: Response) => {
        const authUser: User = req.user;
        let userId: string = req.params.id;
        if (!userId) throw new MissingUserIDError();
        
        if (authUser.id !== userId && authUser.role !== 'admin') {
            throw new UnauthorizedActionError('Forbidden: Only admins can delete other users');
        }

        await service.deleteUser(userId);
        res.json({ message: `User with id ${userId} deleted` });
    }
});
