import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../../types/AuthenticatedRequest.js'; 

export interface IGroupController {
    getAllGroups: (req: Request, res: Response) => void;
    getGroupById: (req: Request, res: Response) => void;
    getCurrentUserGroups: (req: AuthenticatedRequest, res: Response) => void;
}

export default IGroupController;