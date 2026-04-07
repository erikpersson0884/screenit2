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

    // only allow chalmers media images
    if (!url.startsWith("/api/media/")) return null;

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

    const events: Event[] = chalmersITEvents
        .map((newsEvent: ChalmersITNewsEvent): Event | null => {
            if (!isValidEvent(newsEvent)) return null; // Skip invalid events

            const event: Event = {
                id: "chalmers-it-event" + newsEvent.id.toString(),
                name: newsEvent.titleSv || newsEvent.titleEn,
                date: new Date(newsEvent.connectedEvents[0].startTime),
                imagePath: "https://chalmers.it" + getImagePath(newsEvent),
                createdById: "chalmers-it",
                createdAt: new Date(newsEvent.createdAt),
                updatedAt: new Date(newsEvent.updatedAt)
            };
            return event;
        })
        .filter((event: Event | null): event is Event => event !== null);

    return events;
}