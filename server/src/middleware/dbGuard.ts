import { isDbReady } from "../lib/dbState.js";
import { Request, Response, NextFunction } from "express";


export function dbGuard(req: Request, res: Response, next: NextFunction) {
    if (!isDbReady()) {
        return res.status(503).json({
            error: "Database unavailable"
        });
    }

    next();
}

export default dbGuard;
