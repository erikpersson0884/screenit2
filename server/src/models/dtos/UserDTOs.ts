import { z } from 'zod';

const usernameMinLength = 1;
const passwordMinLength = 4;

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
});

export const UserResponseArraySchema = z.array(UserResponseSchema);

  
export type UserResponseDTO = z.infer<typeof UserResponseSchema>;
export type UserResponseArrayDTO = z.infer<typeof UserResponseArraySchema>;