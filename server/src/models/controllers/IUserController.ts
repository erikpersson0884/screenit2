import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../../types/AuthenticatedRequest.js'; 
import { UpdateUserRequestDTO } from '../dtos/UserDTOs.js';

export interface IUserController {
    getAllUsers: (req: Request, res: Response) => void;
    getUserById: (req: Request, res: Response) => void;
    getCurrentUser: (req: AuthenticatedRequest, res: Response) => void;
    updateUser: (req: AuthenticatedRequest<UpdateUserRequestDTO, {id: string}>, res: Response) => void;
}

export default IUserController;