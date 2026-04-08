import { Event, Group } from '../../prisma/generated/prisma/client.js';

export type EventWithRelations = Event & {
    byGroups: Group[];
};


export type ChalmersITNewsEvent = {
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
