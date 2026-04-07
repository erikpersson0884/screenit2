import express from "express";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.js";

import { createGroupController } from "../controllers/GroupController.js";

import { strictAuth} from "../middleware/authMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

const groupController = createGroupController();



// Get all users or a specific user by ID
router.get("/", asyncHandler(groupController.getAllGroups));
router.get("/:id", asyncHandler(groupController.getGroupById));

export default router;
