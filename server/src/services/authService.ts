import jwt from "jsonwebtoken";
import { IAuthService } from "../models/services/IAuthService.js";
import { createUserService } from "./userService.js";
import { UserNotFoundError } from "../errors/UserNotFoundError.js";

class authService implements IAuthService {
    private readonly JWT_SECRET = process.env.JWT_SECRET || "fallbacksecret";

    userService = createUserService();

    async loginUser(username: string, password: string): Promise<string> {
        const user = await this.userService.getUserByUsername(username);
        if (!user) throw new UserNotFoundError(`User with username ${username} not found`);

        const match = password === user.password;
        if (!match) throw new Error("Invalid credentials");
        const userId = user.id;
        
        return jwt.sign({ userId }, this.JWT_SECRET, { expiresIn: "1h" });
    }
}

export function createAuthService(): IAuthService {
    return new authService();
}
export default createAuthService;
