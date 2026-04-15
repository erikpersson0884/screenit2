import express from "express";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.js";
import { createUserController } from "../controllers/userController.js";
import { strictAuth} from "../middleware/authMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { validateRequest } from "../middleware/validateRequestMiddleware.js";
import { UpdateUserRequestDTO, UpdateUserRequestSchema } from '../models/dtos/UserDTOs.js';

const router = express.Router();

const userController = createUserController();

// Get information about the currently authenticated user
router.get(
    "/me",
    strictAuth,
    asyncHandler((req: Request, res: Response) => {
        const authenticatedReq = req as AuthenticatedRequest;
        return userController.getCurrentUser(authenticatedReq, res);
    })
);

// Get all users or a specific user by ID
router.get("/", asyncHandler(userController.getAllUsers));
router.get("/:id", asyncHandler(userController.getUserById));


router.patch(
    '/:id',
    strictAuth,
    validateRequest<UpdateUserRequestDTO>(UpdateUserRequestSchema),
    asyncHandler(
        async (
            req: AuthenticatedRequest<UpdateUserRequestDTO>,
            res: Response
        ) => {
            return userController.updateUser(req, res);
        }
    )
);


export default router;
