import { Event } from '../../../prisma/generated/prisma/client.js';

export interface IEventService {
    getAllEvents(): Promise<Event[]>;
    getEventById(id: string): Promise<Event | null>;
    createEvent(date: Date, userId: string, name: string, fileName: string): Promise<Event>;
    updateEvent(id: string, eventData: Partial<Event>): Promise<Event>;
    deleteEvent(id: string): Promise<boolean>;
}

export default IEventService;
