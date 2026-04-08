import { Event, EventType } from '../../../prisma/generated/prisma/client.js';
import { EventWithRelations } from "../../types/types.js";

export interface IEventService {
    getAllEvents(): Promise<EventWithRelations[]>;
    getEventById(id: string): Promise<EventWithRelations | null>;
    createEvent(date: Date, userId: string, name: string, fileName: string, type: EventType, groupIds?: string[]): Promise<Event>;
    updateEvent(id: string, eventData: Partial<Event>): Promise<Event>;
    deleteEvent(id: string): Promise<boolean>;
    
    syncEventsFromChalmersIT(): Promise<void>;
}

export default IEventService;
