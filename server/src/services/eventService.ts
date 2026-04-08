import { PrismaClient, Role } from "../../prisma/generated/prisma/client.js";
import prismaClient from "../lib/prisma.js";
import { IEventService } from '../models/services/IEventService.js';
import { Event } from '../../prisma/generated/prisma/client.js';



export const createEventService = (client: PrismaClient = prismaClient): IEventService => ({
    getAllEvents: async (): Promise<Event[]> => {
        const events: Event[] =  await client.event.findMany(
            {
                include: {
                    createdBy: true,
                    byGroups: true
                }
            }
        );
        return events;
    },

    getEventById: async (id: string): Promise<Event | null> => {
        const event: Event | null = await client.event.findUnique({
            where: { id: id }
        });
        return event;
    },

    createEvent: async (date: Date, userId: string, name: string, fileName: string, groupIds: string[]): Promise<Event> => {
        const newEvent: Event =  await client.event.create({
            data: {
                date,
                createdById: userId,
                name: name,
                imagePath: "/api/uploads/" + fileName,
                createdAt: new Date(),
                updatedAt: new Date(),
                byGroups: {
                    connect: groupIds.map(id => ({ id }))
                },
            }
        });
        console.log("Created event:", newEvent.name);
        return newEvent;
    },

    updateEvent: async (id: string, eventData: Partial<Event>): Promise<Event> => {
        return await client.event.update({
            where: { id: id },
            data: eventData
        });
    },

    deleteEvent: async (id: string): Promise<boolean> => {
        try {
            const event = await client.event.delete({
                where: { id: id }
            });
            return true;
        } catch (error) {
            return false;
        }
    }
});

export default createEventService;
