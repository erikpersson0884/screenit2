import { z } from 'zod';

export const HealthResponseSchema = z.object({
    status: z.enum(["healthy", "unhealthy"]),
    time: z.string(),
});

export type HealthResponseDTO = z.infer<typeof HealthResponseSchema>;
