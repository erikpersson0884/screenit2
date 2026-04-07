import { z } from 'zod';
import { GroupResponseSchema } from './GroupDTO.js';

export const parseWithSchema = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
    const parseResult = schema.safeParse(data);
    if (!parseResult.success) {
        throw new Error(`Validation failed: ${JSON.stringify(parseResult.error.format())}`);
    }
    else return parseResult.data;
}

// Request Schemas
export const GetAllEventsQuerySchema = z.object({
    includeChalmersIT: z.string().transform((val) => val === "true").optional(),
});

export const CreateEventSchema = z.object({
    name: z.string(),
    date: z.string().datetime().transform((val) => new Date(val)),
    groupIds: z.string().transform((val) => JSON.parse(val) as string[]).optional(),
    byGroups: GroupResponseSchema.array().optional(),
});

export const UpdateEventSchema = z.object({
    name: z.string().min(1).optional(),
    date: z.string().datetime().transform((val) => new Date(val)).optional(),
});


// Response Schemas
export const EventResponseSchema = z.object({
    id: z.string(),
    name: z.string().min(0).optional(),
    date: z.date(),
    imagePath: z.string(),
    createdById: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    byGroups: GroupResponseSchema.array().optional(),
});

export const EventsResponseSchema = z.array(EventResponseSchema);

// DTO Types
export type CreateEventDTO = z.infer<typeof CreateEventSchema>;
export type UpdateEventDTO = z.infer<typeof UpdateEventSchema>;
export type EventResponseDTO = z.infer<typeof EventResponseSchema>;
export type EventsResponseDTO = z.infer<typeof EventsResponseSchema>;
