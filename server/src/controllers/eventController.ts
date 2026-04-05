import sendValidatedResponse from "../middleware/validateResponseMiddleware.js";
import IEventController from "../models/controllers/IEventController.js";
import { Event, User } from '../../prisma/generated/prisma/client.js';
import IEventService from "../models/services/IEventService.js";
import createEventService from "../services/eventService.js";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.js";
import { EventsResponseSchema, EventResponseSchema } from "../models/dtos/EventDTO.js";

const defaultEventService = createEventService();

export const createEventController = (eventService: IEventService = defaultEventService): IEventController => ({

    getAllEvents: async (req, res) => {
        const events: Event[] = await eventService.getAllEvents();
        sendValidatedResponse(res, EventsResponseSchema, events);
    },

    createEvent: async (req: AuthenticatedRequest, res) => {
        const user: User = req.user;
        const { name, date } = req.body;

        if (!req.file) throw new Error("File was not uploaded");
        const imagePath = req.file.filename;

        const newEvent: Event = await eventService.createEvent(date, user.id, name, imagePath);
        sendValidatedResponse(res, EventResponseSchema, newEvent);
    },

    getEventById: async (req, res) => {
        const id = req.params.id as string;
        const event: Event | null = await eventService.getEventById(id);
        sendValidatedResponse(res, EventsResponseSchema, event ? [event] : []);
    },

    updateEvent: async (req: AuthenticatedRequest, res) => {
        const user = req.user as User;
        const id = req.params.id as string;
        const { name, date } = req.body;
        const eventData = { name, date };
        const updatedEvent: Event | null = await eventService.updateEvent(id, eventData);
        sendValidatedResponse(res, EventResponseSchema, updatedEvent ? updatedEvent : {});
    },

    deleteEvent: async (req: AuthenticatedRequest, res) => {
        const user: User = req.user as User;
        const id = req.params.id as string;
                             
        const event = await eventService.getEventById(id);
        if (user.id !== event.createdById || user.role == "admin") throw new Error("Only admins can delete events");

        const deleted: boolean = await eventService.deleteEvent(id);
        sendValidatedResponse(res, EventResponseSchema, event);
    }
});

export default createEventController;
