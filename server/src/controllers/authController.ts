import { Request, Response } from "express";
import { createAuthService } from "../services/authService.js";
import IAuthController from "../models/controllers/IAuthController.js";
import { IAuthService } from "../models/services/IAuthService.js";
import { AuthorizationCode, UserInfo } from "gammait";
import { CustomError } from "../errors/CustomErrors.js";
import { env } from "../config/env.js";

const defualtAuthService: IAuthService = createAuthService();

export const createAuthController = (authService: IAuthService = defualtAuthService): IAuthController => {
    const authorizedClient = new AuthorizationCode({
        clientId: env.GAMMA_CLIENT_ID,
        clientSecret: env.GAMMA_CLIENT_SECRET,
        redirectUri: env.GAMMA_REDIRECT_URI,
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

        const frontendUrl = env.FRONTEND_URL + `/oauth/callback?token=${token}`;
        return res.redirect(frontendUrl); 
    };

    return {
        startGammaLogin,
        handleGammaCallback
    };
};