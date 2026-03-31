import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../../types/AuthenticatedRequest.js'; 

export interface IUserController {
    getAllUsers: (req: Request, res: Response) => void;
    getUserById: (req: Request, res: Response) => void;
    getCurrentUser: (req: AuthenticatedRequest, res: Response) => void;
}

export default IUserController;