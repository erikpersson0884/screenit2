export interface IAuthService {
    loginWithGamma(gammaId: string, profile: any): Promise<string>;
}
