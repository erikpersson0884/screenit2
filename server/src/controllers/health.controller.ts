import { Request, Response } from "express";
import { checkHealth } from "../services/health.service.js";

export const healthCheck = async (req: Request, res: Response) => {
    try {
        const result = await checkHealth();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Health check failed",
        });
    }
};