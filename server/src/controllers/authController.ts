import { Request, Response } from "express";
import { createAuthService } from "../services/authService.js";

const authService = createAuthService();

export async function login(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        const token: string = await authService.loginUser(username, password);
        res.json({token});
    } catch (err: any) {
        res.status(401).json({ error: err.message });
    }
}
