import jwt, { SignOptions } from "jsonwebtoken";
import { IAuthService } from "../models/services/IAuthService.js";
import { createUserService } from "./userService.js";
import { createGroupService } from "./groupService.js";
import { ClientApi, UserInfo, GroupWithPost, UserId as GammaUserId, GroupId as GammaGroupId } from "gammait";
import { PrismaClient, User } from '../../prisma/generated/prisma/client.js';

import prismaClient from "../lib/prisma.js";
import IUserService from "../models/services/IUserService.js";
import { IGroupService } from "../models/services/IGroupService.js";

function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not set in environment variables.");
    return secret;
}

const JWT_SECRET: string = getJwtSecret();

function getPreSharedAuth(): string {
    const auth = process.env.GAMMA_PRE_SHARED_AUTH;
    if (!auth) throw new Error("Gamma API configuration is missing. Please set PRE_SHARED_AUTH in your environment variables.");
    return auth;
}

const PRE_SHARED_AUTH: string = getPreSharedAuth();


class authService implements IAuthService {
    private readonly JWT_SECRET: string = JWT_SECRET;
    private readonly JWT_EXPIRATION_TIME: SignOptions["expiresIn"] =
    (process.env.JWT_EXPIRATION_TIME as SignOptions["expiresIn"]) || "1h";
    private prisma: PrismaClient;
    private userService: IUserService;
    private groupservice: IGroupService;

    private readonly clientapi = new ClientApi({
        authorization: PRE_SHARED_AUTH
    });

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
        this.userService = createUserService(prismaClient);
        this.groupservice = createGroupService(prismaClient);
    }

    

    async loginWithGamma(profile: UserInfo): Promise<string> {
        const gammaId: GammaUserId = profile.sub;
        const username: string = profile.nickname;

        // 1. Get or create user
        let user: User | null = await this.userService.getUserByGammaId(gammaId);

        if (!user) {
            user = await this.userService.createUser(gammaId, username);
        } else {
            // keep username updated
            user = await this.userService.updateUser(user.id, {
                username,
            });
        }

        // 2. Fetch Gamma groups
        const gammaGroups: GroupWithPost[] =
            await this.clientapi.getGroupsFor(gammaId);

        // 3. Sync groups to DB
        await this.groupservice.syncUserGroups(user.id, gammaGroups);

        // 4. Generate JWT
        return jwt.sign(
            { userId: user.id },
            this.JWT_SECRET,
            { expiresIn: this.JWT_EXPIRATION_TIME }
        );
    }
}

export function createAuthService(prisma: PrismaClient = prismaClient): IAuthService {
    return new authService(prisma);
}
export default createAuthService;
