import { PrismaClient } from "@prisma/client"; 
import prismaClient from "../lib/prisma.js";
import { IEventService } from '../models/services/IEventService.js';
import { Event } from '@prisma/client';



export const createEventService = (client: PrismaClient = prismaClient): IEventService => ({
    getAllEvents: async (): Promise<Event[]> => {
        return await client.event.findMany();
    },

    getEventById: async (id: string): Promise<Event> => {
        const event = await client.event.findUnique({
            where: { id: id }
        });
        if (!event) throw new Error(`Event with id ${id} not found`);
        return event;
    },

    createEvent: async (date: Date, userId: string, name: string, imagePath: string): Promise<Event> => {
        const newEvent: Event =  await client.event.create({
            data: {
                date,
                createdById: userId,
                name: name,
                imagePath: imagePath,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });
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
            await client.event.delete({
                where: { id: id }
            });
            return true;
        } catch (error) {
            return false;
        }
    }
});

export default createEventService;
