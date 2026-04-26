import jwt, { SignOptions } from "jsonwebtoken";
import { IAuthService } from "../models/services/IAuthService.js";
import { createUserService } from "./userService.js";
import { createGroupService } from "./groupService.js";
import { UserInfo, UserId as GammaUserId } from "gammait";
import { PrismaClient, User } from '../../prisma/generated/prisma/client.js';

import prismaClient from "../lib/prisma.js";
import IUserService from "../models/services/IUserService.js";
import { IGroupService } from "../models/services/IGroupService.js";
import { env } from "../config/env.js";


class authService implements IAuthService {
    private readonly JWT_EXPIRATION_TIME: SignOptions["expiresIn"] =
    (env.JWT_EXPIRATION_TIME as SignOptions["expiresIn"]) || "1h";
    private prisma: PrismaClient;
    private userService: IUserService;
    private groupservice: IGroupService;

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
        this.userService = createUserService(prismaClient);
        this.groupservice = createGroupService(prismaClient);
    }


    async loginWithGamma(profile: UserInfo): Promise<string> {
        const gammaId: GammaUserId = profile.sub;
        const username: string = profile.nickname;

        let user: User | null = await this.userService.getUserByGammaId(gammaId);
        if (!user) user = await this.userService.createUser(gammaId, username);

        await this.groupservice.syncUserGroups(user);
        await this.userService.syncUserWithGamma(gammaId);

        return jwt.sign(
            { userId: user.id },
            env.JWT_SECRET,
            { expiresIn: this.JWT_EXPIRATION_TIME }
        );
    }
}

export function createAuthService(prisma: PrismaClient = prismaClient): IAuthService {
    return new authService(prisma);
}

export default createAuthService;
