import { z } from 'zod';

export const parseWithSchema = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
    const parseResult = schema.safeParse(data);
    if (!parseResult.success) {
        throw new Error(`Validation failed: ${JSON.stringify(parseResult.error.format())}`);
    }
    else return parseResult.data;
}

// Request Schemas
export const CreateEventSchema = z.object({
    name: z.string().min(1),
    date: z.string().datetime().transform((val) => new Date(val)),
});

export const UpdateEventSchema = z.object({
    name: z.string().min(1).optional(),
    date: z.string().datetime().transform((val) => new Date(val)).optional(),
});


// Response Schemas
export const EventResponseSchema = z.object({
    id: z.string(),
    name: z.string().min(1).optional(),
    date: z.date(),
    createdById: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const EventsResponseSchema = z.array(EventResponseSchema);

// DTO Types
export type CreateEventDTO = z.infer<typeof CreateEventSchema>;
export type UpdateEventDTO = z.infer<typeof UpdateEventSchema>;
export type EventResponseDTO = z.infer<typeof EventResponseSchema>;
export type EventsResponseDTO = z.infer<typeof EventsResponseSchema>;
