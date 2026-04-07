import { UserInfo } from "gammait";

export interface IAuthService {
    loginWithGamma(profile: UserInfo): Promise<string>;
}
