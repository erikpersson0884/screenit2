import express from 'express';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest.js';
import createEventController from '../controllers/eventController.js';
import { CreateEventSchema, UpdateEventSchema } from '../models/dtos/EventDTO.js';
import { validateRequest } from '../middleware/validateRequestMiddleware.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { strictAuth } from '../middleware/authMiddleware.js';
import { upload } from '../multner/upload.js';  

const router = express.Router();

const eventController = createEventController;

router.get('/',
    asyncHandler((req: Request, res: Response) =>
        eventController.getAllEvents(req, res)
    )
);

router.get('/:id', 
    asyncHandler((req: Request, res: Response) => 
        eventController.getEventById(req, res)
    )
);

router.post(
    '/',
    strictAuth,
    upload.single('image'),
    validateRequest(CreateEventSchema),
    asyncHandler((req: AuthenticatedRequest, res: Response) =>
        eventController.createEvent(req, res)
    )
);

router.patch(
    '/:id',
    strictAuth,
    validateRequest(UpdateEventSchema),
    asyncHandler((req: AuthenticatedRequest, res: Response) =>
        eventController.updateEvent(req, res)
    )
);

router.delete('/:id', 
    strictAuth,
    asyncHandler((req: AuthenticatedRequest, res: Response) =>
        eventController.deleteEvent(req, res)
    )
);

export default router;
