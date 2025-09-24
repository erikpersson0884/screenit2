import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { createUserService } from '../services/userService.js';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest.js';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined in environment variables');

const userService = createUserService();

// strict: must have a valid token, else 401
export const strictAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        if (!decoded || typeof decoded !== 'object' || !decoded.userId) {
            res.status(401).json({ message: 'Invalid token.' });
            return;
        }

        const user = await userService.getUserById(decoded.userId);
        if (!user) {
            res.status(404).json({ message: 'User not found for token.' });
            return;
        }

        (req as AuthenticatedRequest).user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

// optional: if token exists and is valid → attach user, otherwise skip
export const optionalAuth = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return next(); // no token, continue as guest
        }

        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        if (!decoded || typeof decoded !== 'object' || !decoded.userId) {
            return next(); // invalid token, skip without user
        }

        const user = await userService.getUserById(decoded.userId);
        if (user) {
            (req as AuthenticatedRequest).user = user;
        }

        return next();
    } catch (error) {
        // invalid/expired token → just continue without user
        return next();
    }
};
