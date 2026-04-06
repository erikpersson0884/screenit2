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
}

export const getChalmersITEvents: () => Promise<Event[]> = async (): Promise<Event[]> => {
    let response: Response;
    try{
        response = await fetch("https://chalmers.it/api/news");
    } catch (error) {
        console.log("Ran into an error trying to get chalmers.it events, error:")
        console.log(error)
        return []
    }
        if (!response.ok) {
            throw new Error(`Failed to fetch Chalmers IT events: ${response.statusText}`);
        }

        const chalmersITEvents: ChalmersITNewsEvent[] = await response.json();

        const getImagePath = (event: ChalmersITNewsEvent): string | null => {
            const content: string = event.contentSv || event.contentEn;

            const match: RegExpMatchArray | null = content.match(/!\[.*?\]\((.*?)\)/);
            if (!match) return null;

            const url = match[1];

            // only allow chalmers media images
            if (!url.startsWith("/api/media/")) return null;

            return url;
        };

        const events: Event[] = chalmersITEvents
            .map((newsEvent: ChalmersITNewsEvent): Event | null => {
                const imagePath: string | null = getImagePath(newsEvent);
                if (!imagePath) return null; // Skip events without an image
                const event: Event = {
                    id: "chalmers-it-event" + newsEvent.id.toString(),
                    name: newsEvent.titleSv || newsEvent.titleEn,
                    date: new Date(newsEvent.scheduledPublish),
                    imagePath: "https://chalmers.it" + imagePath,
                    createdById: "chalmers-it",
                    createdAt: new Date(newsEvent.createdAt),
                    updatedAt: new Date(newsEvent.updatedAt)
                };
                return event;
            })
            .filter((event: Event | null): event is Event => event !== null);

        return events;

}