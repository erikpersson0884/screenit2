import sendValidatedResponse from "../middleware/validateResponseMiddleware.js";
import IEventController from "../models/controllers/IEventController.js";
import { Event, User } from '../../prisma/generated/prisma/client.js';
import IEventService from "../models/services/IEventService.js";
import createEventService from "../services/eventService.js";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.js";
import { EventsResponseSchema, EventResponseSchema } from "../models/dtos/EventDTO.js";
import { getChalmersITEvents } from "../repositories/chalmersITRepository.js";
import "dotenv/config.js";
import { NotAllowedToModifyEventError, MissingFileError } from "../errors/CustomErrors.js";

const defaultEventService = createEventService();

export const createEventController = (eventService: IEventService = defaultEventService): IEventController => ({

    getAllEvents: async (req, res) => {
        const events: Event[] = await eventService.getAllEvents();
        const includeChalmersIT: boolean = req.query.includeChalmersIT !== "false";
        if (includeChalmersIT) {
            const chalmersITEvents: Event[] = await getChalmersITEvents();
            events.push(...chalmersITEvents);
        }
        sendValidatedResponse(res, EventsResponseSchema, events);
    },

    createEvent: async (req: AuthenticatedRequest, res) => {
        const user: User = req.user;
        const { name, date }: {name: string, date: Date} = req.body;

        if (!req.file) throw new MissingFileError();
        const imagePath: string = req.file.filename;

        const newEvent: Event = await eventService.createEvent(date, user.id, name, imagePath);
        sendValidatedResponse(res, EventResponseSchema, newEvent);
    },

    getEventById: async (req, res) => {
        const id: string = req.params.id as string;
        const event: Event | null = await eventService.getEventById(id);
        sendValidatedResponse(res, EventsResponseSchema, event ? [event] : []);
    },

    updateEvent: async (req: AuthenticatedRequest, res) => {
        const user: User = req.user as User;
        const id: string = req.params.id as string;

        const eventToUpdate: Event | null = await eventService.getEventById(id);
        if (!eventToUpdate) throw new Error(`Event with id ${id} not found so it cannot be updated`);

        if (user.id !== eventToUpdate.createdById || user.role == "admin") throw new NotAllowedToModifyEventError();

        const eventData: {name: string, date: Date} = req.body;
        const updatedEvent: Event | null = await eventService.updateEvent(id, eventData);
        sendValidatedResponse(res, EventResponseSchema, updatedEvent ? updatedEvent : {});
    },

    deleteEvent: async (req: AuthenticatedRequest, res) => {
        const user: User = req.user as User;
        const id = req.params.id as string;
                             
        const event: Event | null = await eventService.getEventById(id);
        if (!event) throw new Error(`Event with id ${id} not found so it cannot be deleted`);

        if (user.id !== event.createdById || user.role == "admin") throw new NotAllowedToModifyEventError();

        await eventService.deleteEvent(id);

        sendValidatedResponse(res, EventResponseSchema, event);
    }
});

export default createEventController;
