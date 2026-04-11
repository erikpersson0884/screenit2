import { EventType } from '../../prisma/generated/prisma/client.js';
import { ChalmersITNewsEvent } from "../types/types.js";
import { EventWithRelations } from "../types/types.js";


const getImagePath = (event: ChalmersITNewsEvent): string | null => {
    const content: string = event.contentSv || event.contentEn;

    const match: RegExpMatchArray | null = content.match(/!\[.*?\]\((.*?)\)/);
    if (!match) return null;

    const url = match[1];

    return url;
};

const isValidEvent = (event: ChalmersITNewsEvent): boolean => {
    // 1. If news post has no connected events, it is not an event
    if (event.connectedEvents.length === 0) return false;

    // 2. If the event has already started, it is not relevant
    const now = new Date();
    const startTime = new Date(event.connectedEvents[0].startTime);
    if (startTime <= now) return false;

    // 3. If the event dont have a poster image, it is not relevant
    const imagePath: string | null = getImagePath(event);
    if (!imagePath) return false;

    // 4. If the event poster image is not from chalmers media, it is not relevant
    if (!imagePath.startsWith("/api/media/")) return false;

    return true;
};

const convertChalmersITEventToEvent = (newsEvent: ChalmersITNewsEvent): EventWithRelations => {
    const event: EventWithRelations = {
        id: "chalmers-it-event" + newsEvent.id.toString(),
        name: newsEvent.titleSv || newsEvent.titleEn,
        date: new Date(newsEvent.connectedEvents[0].startTime),
        imagePath: "https://chalmers.it" + getImagePath(newsEvent),
        createdById: newsEvent.writtenByGammaUserId,
        createdAt: new Date(newsEvent.createdAt),
        updatedAt: new Date(newsEvent.updatedAt),
        visible: true,
        type: EventType.chalmersIT,
        byGroups: [{
            id: newsEvent.writtenFor.gammaSuperGroupId,
            name: newsEvent.writtenFor.prettyName,
            prettyName: newsEvent.writtenFor.prettyName,
            superGroupId: newsEvent.writtenFor.gammaSuperGroupId,
        }],
    };
    return event;
};

export const getChalmersITEvents = async():Promise<EventWithRelations[]> => {
    let response: Response;
    try {
        response = await fetch("https://chalmers.it/api/news");
    } catch (error) {
        console.error("Failed to fetch Chalmers IT events:", error);
        return [];
    }

    const chalmersITEvents: ChalmersITNewsEvent[] = await response.json();

    const unfilteredEvents: (EventWithRelations | null)[] = chalmersITEvents.map((newsEvent: ChalmersITNewsEvent): EventWithRelations | null => {
            if (!isValidEvent(newsEvent)) return null; // Skip invalid events

            return convertChalmersITEventToEvent(newsEvent)
    })
        
    const events: EventWithRelations[] = unfilteredEvents.filter((event: EventWithRelations | null): event is EventWithRelations => event !== null);

    return events;
}