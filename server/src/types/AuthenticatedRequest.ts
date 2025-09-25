// types/AuthenticatedRequest.ts
import { Request } from "express";
import { User } from "@prisma/client";

export interface AuthenticatedRequest extends Request {
    user: User;
}
