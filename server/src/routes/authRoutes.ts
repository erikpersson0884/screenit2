import { Router } from "express";
import { createAuthController } from "../controllers/authController.js";
import asyncHandler from "../middleware/asyncHandler.js";
import IAuthController from "../models/controllers/IAuthController.js";

const router = Router();
const authController: IAuthController = createAuthController();

router.get("/gamma", asyncHandler(authController.startGammaLogin));
router.get("/gamma/callback", asyncHandler(authController.handleGammaCallback));

export default router;
