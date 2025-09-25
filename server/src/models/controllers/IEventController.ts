import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../../types/AuthenticatedRequest.js'; 

export interface IEventController {
    getAllEvents(req: Request, res: Response): Promise<void>;
    getEventById(req: Request, res: Response): Promise<void>;
    createEvent(req: AuthenticatedRequest, res: Response): Promise<void>;
    updateEvent(req: AuthenticatedRequest, res: Response): Promise<void>;
    deleteEvent(req: AuthenticatedRequest, res: Response): Promise<void>;
}

export default IEventController;
