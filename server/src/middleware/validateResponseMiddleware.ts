import { ZodSchema } from 'zod';
import { Response } from 'express';

export const sendValidatedResponse = <T>(res: Response, schema: ZodSchema<T>, data: unknown) => {
    const parsedData = schema.parse(data);
    res.json(parsedData);
};

export default sendValidatedResponse;
