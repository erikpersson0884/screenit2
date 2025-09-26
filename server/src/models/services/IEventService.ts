import { Event } from '@prisma/client';

export interface IEventService {
    getAllEvents(): Promise<Event[]>;
    getEventById(id: string): Promise<Event>;
    createEvent(date: Date, userId: string, name: string, imagePath: string): Promise<Event>;
    updateEvent(id: string, eventData: Partial<Event>): Promise<Event>;
    deleteEvent(id: string): Promise<boolean>;
}

export default IEventService;
