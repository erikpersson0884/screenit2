import { z, ZodSchema } from 'zod';
import { RequestHandler } from 'express';

export const validateRequest = <T>(
    schema: ZodSchema<T>
): RequestHandler<{}, any, T> => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json(result.error.format());
        }

        req.body = result.data;
        next();
    };
};