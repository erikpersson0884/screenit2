import { PrismaClient } from "../../prisma/generated/prisma/client.js";
import prismaClient from "../lib/prisma.js";
import { IEventService } from '../models/services/IEventService.js';
import { Event, EventType } from '../../prisma/generated/prisma/client.js';
import { EventWithRelations } from "../types/types.js";
import { ClientApi } from "gammait";
import { getChalmersITEvents } from "../repositories/chalmersITRepository.js";
import logger from "../lib/logger.js";
import { isDbReady } from "../lib/dbState.js";


function getPreSharedAuth(): string {
    const auth = process.env.GAMMA_PRE_SHARED_AUTH;
    if (!auth) throw new Error("Gamma API configuration is missing. Please set PRE_SHARED_AUTH in your environment variables.");
    return auth;
}

const PRE_SHARED_AUTH: string = getPreSharedAuth();

class EventService implements IEventService {
    private prisma: PrismaClient;

    private readonly gammaApi = new ClientApi({
        authorization: PRE_SHARED_AUTH
    });

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }


    async getAllEvents(): Promise<EventWithRelations[]> {
        return await this.prisma.event.findMany(
            {
                include: {
                    byGroups: true
                }
            }
        );
    }

    async getEventById(id: string): Promise<EventWithRelations | null> {
        return await this.prisma.event.findUnique({
            where: { id: id },
            include: {
                byGroups: true
            }
        });
    }

    async createEvent(date: Date, userId: string, name: string, fileName: string, type: EventType, groupIds: string[] ): Promise<EventWithRelations> {
        const newEvent: EventWithRelations = await this.prisma.event.create({
            data: {
                date,
                createdById: userId,
                name,
                imagePath: "/api/uploads/" + fileName,
                visible: true,
                type: type,
                createdAt: new Date(),
                updatedAt: new Date(),
                byGroups: {
                    connect: groupIds.map(id => ({ id }))
                },
            },
            include: {
                byGroups: true
            }
        });
        logger.info(`Created event named: ${newEvent.name} with id: ${newEvent.id}`);
        return newEvent;
    }

    async updateEvent(id: string, eventData: Partial<Event>): Promise<EventWithRelations> {
        const updatedEvent: EventWithRelations = await this.prisma.event.update({
            where: { id: id },
            data: eventData,
            include: {
                byGroups: true
            }
        });
        return updatedEvent;
    }

    async deleteEvent(id: string): Promise<boolean> {
        try {
            const event = await this.prisma.event.delete({
                where: { id: id }
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    async upsertEvents(events: EventWithRelations[]): Promise<EventWithRelations[]> {
        if (!isDbReady()) {
            logger.warn("DB not ready → skipping event sync");
            return [];
        }

        const upsertedEvents: EventWithRelations[] = await Promise.all(
            events.map(event =>
                this.prisma.event.upsert({
                    where: { id: event.id },
                    update: {
                        name: event.name,
                        date: event.date,
                        imagePath: event.imagePath,
                    },
                    create: {
                        id: event.id,
                        name: event.name,
                        date: event.date,
                        visible: true,
                        type: "chalmersIT",
                        imagePath: event.imagePath,
                        createdById: event.createdById,
                        byGroups: {
                            connectOrCreate: event.byGroups.map(g => ({
                                where: { id: g.id }, // check if group exists
                                create: {         // create if missing
                                    id: g.id,
                                    name: g.name,
                                    prettyName: g.prettyName,
                                    superGroupId: g.superGroupId || g.id // fallback if undefined
                                }
                            }))
                        }
                    },
                    include: {
                        byGroups: true
                    }
                })
            )
        );
        return upsertedEvents;
    }

    async syncEventsFromChalmersIT(): Promise<EventWithRelations[]> {
        const chalmersITEvents: EventWithRelations[] = await getChalmersITEvents(); // or whatever method

        return await this.upsertEvents(chalmersITEvents);
    }
};

function createEventService(prisma: PrismaClient = prismaClient): IEventService {
    return new EventService(prisma);
}

export default createEventService;
