import express from 'express';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest.js';
import { createEventController } from '../controllers/eventController.js';
import { CreateEventSchema, UpdateEventSchema } from '../models/dtos/EventDTO.js';
import { validateRequest } from '../middleware/validateRequestMiddleware.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { strictAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

const eventController = createEventController();

router.get('/', (req: Request, res: Response) => {
    eventController.getAllEvents(req, res);
});

router.get('/:id', (req: Request, res: Response) => {
    eventController.getEventById(req, res);
});

router.post(
    '/',
    strictAuth,
    validateRequest(CreateEventSchema),
    asyncHandler((req: Request, res: Response) => {
        const authenticatedReq = req as AuthenticatedRequest;
        eventController.createEvent(authenticatedReq, res);
    })
);

router.patch(
    '/:id',
    strictAuth,
    validateRequest(UpdateEventSchema),
    asyncHandler((req: Request, res: Response) => {
        const authenticatedReq = req as AuthenticatedRequest;
        eventController.updateEvent(authenticatedReq, res);
    })
);

router.delete('/:id', 
    strictAuth,
    asyncHandler((req: Request, res: Response) => {
        const authenticatedReq = req as AuthenticatedRequest;
        return eventController.deleteEvent(authenticatedReq, res);
    })
);

export default router;
