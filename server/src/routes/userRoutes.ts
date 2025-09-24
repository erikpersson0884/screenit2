import express from "express";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.js";

import { createUserController } from "../controllers/userController.js";

import { strictAuth} from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequestMiddleware.js";
import { CreateUserSchema, UpdateUserSchema } from "../models/dtos/UserDTOs.js";
import asyncHandler from "../middleware/asyncHandler.js";

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

// Create a new user
router.post(
    "/",
    validateRequest(CreateUserSchema),
    asyncHandler(userController.createUser)
);

// Update a user by ID (requires authentication)
router.patch(
    "/:id",
    strictAuth,
    validateRequest(UpdateUserSchema),
    asyncHandler((req: Request, res: Response) => {
        const authenticatedReq = req as AuthenticatedRequest;
        return userController.updateUser(authenticatedReq, res);
    })
);

// Delete a user by ID (requires authentication)
router.delete(
    "/:id",
    strictAuth,
    asyncHandler((req: Request, res: Response) => {
        const authenticatedReq = req as AuthenticatedRequest;
        return userController.deleteUser(authenticatedReq, res);
    })
);

export default router;
