import jwt from "jsonwebtoken";
import { IAuthService } from "../models/services/IAuthService.js";
import { createUserService } from "./userService.js";
import { UserNotFoundError } from "../errors/UserNotFoundError.js";

class authService implements IAuthService {
    private readonly JWT_SECRET = process.env.JWT_SECRET || "fallbacksecret";
    private readonly JWT_EXPIRATION_TIME = "1h";

    userService = createUserService();

    async loginWithGamma(gammaId: string, profile: any): Promise<string> {
        // Check if user with this gammaId exists in your database
        let user = await this.userService.getUserById(gammaId);
        if (!user) {
            // If not, create a new user with the gammaId and profile information
            user = await this.userService.createUser(gammaId, profile.nickname);
        }
        // Generate and return a JWT for the user
        const userId = user.id;
        return jwt.sign({ userId }, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRATION_TIME });
    }
}

export function createAuthService(): IAuthService {
    return new authService();
}
export default createAuthService;
