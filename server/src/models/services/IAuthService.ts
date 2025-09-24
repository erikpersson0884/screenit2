
export interface IAuthService {
    loginUser(username: string, password: string): Promise<string>;
}
