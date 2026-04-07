import { z } from 'zod';

export const GroupResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    prettyName: z.string(),
});

export type GroupResponseDTO = z.infer<typeof GroupResponseSchema>;
