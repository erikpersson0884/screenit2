import { z } from 'zod';
import { GroupResponseSchema } from './GroupDTO.js';

export const parseWithSchema = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
    const parseResult = schema.safeParse(data);
    if (!parseResult.success) {
        throw new Error(`Validation failed: ${JSON.stringify(parseResult.error.format())}`);
    }
    else return parseResult.data;
}

// Response Schemas
export const UserResponseSchema = z.object({
    id: z.string(),
    username: z.string(),
    role: z.string(),
    createdAt: z.date(),
    groups: z.array(GroupResponseSchema).optional(),
});

export const UserResponseArraySchema = z.array(UserResponseSchema);

  
export type UserResponseDTO = z.infer<typeof UserResponseSchema>;
export type UserResponseArrayDTO = z.infer<typeof UserResponseArraySchema>;