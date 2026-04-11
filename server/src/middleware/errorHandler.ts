
import { Request, Response, NextFunction, ErrorRequestHandler  } from 'express';
import { CustomError } from '../errors/CustomErrors.js';
import logger from '../lib/logger.js';

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error('An error occurred:', err);
    
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({ message: err.message });
    } else {
        // Generic error if it's not a custom one
        res.status(500).json({
            message: 'Internal server error',
            error: 'Something went wrong',
        });
    }
};
