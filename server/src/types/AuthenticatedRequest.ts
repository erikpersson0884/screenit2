// types/AuthenticatedRequest.ts
import { Request } from "express";
import { User } from "../../prisma/generated/prisma/client.js";

export interface AuthenticatedRequest extends Request {
    user: User;
}
