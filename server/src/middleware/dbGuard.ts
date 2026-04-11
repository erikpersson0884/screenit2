import { getDbReady } from "../lib/dbState.js";
import { Request, Response, NextFunction } from "express";


export function dbGuard(req: Request, res: Response, next: NextFunction) {
    if (!getDbReady()) {
        return res.status(503).json({
            error: "Database unavailable"
        });
    }

    next();
}

export default dbGuard;
