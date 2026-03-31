import { Request, Response } from "express";

export default interface IAuthController {
    startGammaLogin: (req: Request, res: Response) => Promise<void>;
    handleGammaCallback: (req: Request, res: Response) => Promise<void>;
}
