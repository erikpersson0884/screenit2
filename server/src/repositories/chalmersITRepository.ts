import { Event } from '../../prisma/generated/prisma/client.js';


interface ChalmersITNewsEvent {
    id: number;
    titleEn: string;
    titleSv: string;
    contentEn: string;
    contentSv: string;
    createdAt: string;
    updatedAt: string;
    scheduledPublish: string;
    writtenByGammaUserId: string;
    status: string;
    writtenFor: {
        gammaSuperGroupId: string;
        prettyName: string;
    };
    connectedEvents: {
        id: number;
        titleEn: string;
        titleSv: string;
        descriptionEn: string;
        descriptionSv: string;
        fullDay: boolean;
        startTime: string;
        endTime: string;
        location: string;
        createdAt: string;
        updatedAt: string;
    }[];
}



const getImagePath = (event: ChalmersITNewsEvent): string | null => {
    const content: string = event.contentSv || event.contentEn;

    const match: RegExpMatchArray | null = content.match(/!\[.*?\]\((.*?)\)/);
    if (!match) return null;

    const url = match[1];

    return url;
};

const isValidEvent = (event: ChalmersITNewsEvent): boolean => {
    // If post has no connected events, it is not an event
    if (event.connectedEvents.length === 0) return false;

    // If the event has already started, it is not relevant
    const now = new Date();
    if (!event.connectedEvents[0].startTime) return false;

    // If the event dont have a poster image, it is not relevant
    const imagePath: string | null = getImagePath(event);
    if (!imagePath) return false;

    // If the event poster image is not from chalmers media, it is not relevant
    if (!imagePath.startsWith("/api/media/")) return false;

    return true;
};

export const getChalmersITEvents: () => Promise<Event[]> = async (): Promise<Event[]> => {
    let response: Response;
    try {
        response = await fetch("https://chalmers.it/api/news");
    } catch (error) {
        console.error("Failed to fetch Chalmers IT events:", error);
        return [];
    }

    const chalmersITEvents: ChalmersITNewsEvent[] = await response.json();

    interface ApiEvent extends Event {
        byGroups: {
            id: string;
            name: string;
            prettyName: string;
            superGroupId: string;
        }[];
    }

    const events: Event[] = chalmersITEvents
        .map((newsEvent: ChalmersITNewsEvent): Event | null => {
            if (!isValidEvent(newsEvent)) return null; // Skip invalid events

            const event: ApiEvent = {
                id: "chalmers-it-event" + newsEvent.id.toString(),
                name: newsEvent.titleSv || newsEvent.titleEn,
                date: new Date(newsEvent.connectedEvents[0].startTime),
                imagePath: "https://chalmers.it" + getImagePath(newsEvent),
                createdById: newsEvent.writtenByGammaUserId,
                createdAt: new Date(newsEvent.createdAt),
                updatedAt: new Date(newsEvent.updatedAt),
                byGroups: [{
                    id: newsEvent.writtenFor.gammaSuperGroupId,
                    name: newsEvent.writtenFor.prettyName,
                    prettyName: newsEvent.writtenFor.prettyName,
                    superGroupId: newsEvent.writtenFor.gammaSuperGroupId,
                }],
            };
            return event;
        })
        .filter((event: Event | null): event is Event => event !== null);

    return events;
}