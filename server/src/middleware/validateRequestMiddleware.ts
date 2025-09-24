import { ZodSchema } from 'zod';
import { RequestHandler } from 'express';

export const validateRequest = (schema: ZodSchema): RequestHandler => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json(result.error.format());
            return; // just return, no explicit Response type
        }

        req.body = result.data;
        next();
    };
};
