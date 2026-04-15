import { Request, Response } from "express";
import { createAuthService } from "../services/authService.js";
import IAuthController from "../models/controllers/IAuthController.js";
import { IAuthService } from "../models/services/IAuthService.js";
import { AuthorizationCode, UserInfo } from "gammait";
import { CustomError } from "../errors/CustomErrors.js";


const defualtAuthService: IAuthService = createAuthService();

export const createAuthController = (authService: IAuthService = defualtAuthService): IAuthController => {
    if (!process.env.GAMMA_CLIENT_ID || !process.env.GAMMA_CLIENT_SECRET || !process.env.GAMMA_REDIRECT_URI) {
        throw new Error("Gamma OAuth configuration is missing. Please set GAMMA_CLIENT_ID, GAMMA_CLIENT_SECRET, and GAMMA_REDIRECT_URI in your environment variables.");
    }
    
    const authorizedClient = new AuthorizationCode({
        clientId: process.env.GAMMA_CLIENT_ID,
        clientSecret: process.env.GAMMA_CLIENT_SECRET,
        redirectUri: process.env.GAMMA_REDIRECT_URI,
        scope: ["openid", "profile"],
    });

    const startGammaLogin = async (req: Request, res: Response) => {
        const url = authorizedClient.authorizeUrl();
        res.redirect(url);
    };

    const handleGammaCallback = async (req: Request, res: Response) => {
        const code = req.query.code;

        if (!code) {
            throw new CustomError(400, "Authorization code is missing from the callback request."); // TODO: Add more specific error handling for missing authorization code
        }

        await authorizedClient.generateToken(code.toString());
        const profile: UserInfo = await authorizedClient.userInfo();

        // pass to service layer
        const token: string = await authService.loginWithGamma(profile);

        const frontendUrl = process.env.FRONTEND_URL + `/oauth/callback?token=${token}`;
        return res.redirect(frontendUrl); 
    };

    return {
        startGammaLogin,
        handleGammaCallback
    };
};