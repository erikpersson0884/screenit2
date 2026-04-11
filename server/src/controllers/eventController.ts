import sendValidatedResponse from "../middleware/validateResponseMiddleware.js";
import IEventController from "../models/controllers/IEventController.js";
import { Event, User, EventType, Group } from '../../prisma/generated/prisma/client.js';
import IEventService from "../models/services/IEventService.js";
import createEventService from "../services/eventService.js";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest.js";
import { EventsResponseSchema, EventResponseSchema } from "../models/dtos/EventDTO.js";
import { getChalmersITEvents } from "../repositories/chalmersITRepository.js";
import "dotenv/config.js";
import CustomError, { NotAllowedToModifyEventError, MissingFileError } from "../errors/CustomErrors.js";
import { CreateEventDTO } from "../models/dtos/EventDTO.js";
import { EventWithRelations } from "../types/types.js";
import { IGroupService } from "../models/services/IGroupService.js";
import createGroupService from "../services/groupService.js";


class EventController implements IEventController {
    private eventService: IEventService;
    private groupService: IGroupService;
    
    constructor(eventService: IEventService, groupService: IGroupService) {
        this.eventService = eventService;
        this.groupService = groupService;
    }

    async checkIfUserCanModifyEvent(user: User, event: EventWithRelations): Promise<boolean> {
        const groups: Group[] = await this.groupService.getGroupsForUser(user.id);

        // Is allowed to modify if:
        return user.gammaId === event.createdById ||                                                  // User created the event
            user.role === "admin" ||                                                             // User is an admin
            (event.byGroups.some(group => groups.some(userGroup => userGroup.id === group.id))); // User is in a group that has access to the event
    }

    // Endpoints used by routes
    async getAllEvents(req: any, res: any): Promise<void> {
        const events: Event[] = await this.eventService.getAllEvents();
        sendValidatedResponse(res, EventsResponseSchema, events);
    }

    async createEvent(req: AuthenticatedRequest, res: any): Promise<void> {
        const user: User = req.user;
        const { name, date, groupIds }: CreateEventDTO = req.body;

        if (!req.file) throw new MissingFileError();
        const imagePath: string = req.file.filename;

        const newEvent: Event = await this.eventService.createEvent(date, user.id, name, imagePath, EventType.userCreated, groupIds);
        sendValidatedResponse(res, EventResponseSchema, newEvent);
    }

    async getEventById(req: any, res: any): Promise<void> {
        const id: string = req.params.id as string;
        const event: Event | null = await this.eventService.getEventById(id);
        sendValidatedResponse(res, EventsResponseSchema, event ? [event] : []);
    }

    async updateEvent(req: AuthenticatedRequest, res: any): Promise<void> {
        const user: User = req.user as User;
        const id: string = req.params.id as string;

        const eventToUpdate: EventWithRelations | null = await this.eventService.getEventById(id);
        if (!eventToUpdate) throw new CustomError(404, `Event with id ${id} not found so it cannot be updated`);

        if (!(await this.checkIfUserCanModifyEvent(user, eventToUpdate))) throw new NotAllowedToModifyEventError();

        const eventData: {name: string, date: Date} = req.body;
        const updatedEvent: Event | null = await this.eventService.updateEvent(id, eventData);
        sendValidatedResponse(res, EventResponseSchema, updatedEvent ? updatedEvent : {});
    }

    async deleteEvent(req: AuthenticatedRequest, res: any): Promise<void> {
        const user: User = req.user as User;
        const id = req.params.id as string;
                             
        const eventToDelete: EventWithRelations | null = await this.eventService.getEventById(id);
        if (!eventToDelete) throw new Error(`Event with id ${id} not found so it cannot be deleted`);

        if (!(await this.checkIfUserCanModifyEvent(user, eventToDelete))) throw new NotAllowedToModifyEventError();

        await this.eventService.deleteEvent(id);
        sendValidatedResponse(res, EventResponseSchema, event);
    }
}

export const createEventController = (eventService: IEventService = createEventService(), groupService: IGroupService = createGroupService()): IEventController => {
    return new EventController(eventService, groupService);
}

export default createEventController();
