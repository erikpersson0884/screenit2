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

// Request Schemas
export const CreateUserSchema = z.object({
    username: z.string().min(usernameMinLength),
    password: z.string().min(passwordMinLength),
});

export const UpdateUserSchema = z.object({
    username: z.string().min(usernameMinLength).optional(),
    password: z.string().min(passwordMinLength).optional(),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;


// Response Schemas
export const UserResponseSchema = z.object({
    id: z.string(),
    username: z.string(),
    role: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const UserResponseArraySchema = z.array(UserResponseSchema);

  
export type UserResponseDTO = z.infer<typeof UserResponseSchema>;
export type UserResponseArrayDTO = z.infer<typeof UserResponseArraySchema>;