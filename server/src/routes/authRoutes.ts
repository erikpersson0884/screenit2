import { Router } from "express";
import { login } from "../controllers/authController.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = Router();

router.post("/login", asyncHandler(login));

export default router;
