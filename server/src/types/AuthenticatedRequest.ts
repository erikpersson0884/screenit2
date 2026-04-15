import { Request } from "express";
import { User } from "../../prisma/generated/prisma/client.js";

export interface AuthenticatedRequest<
    Body = unknown,
    Params = {}
> extends Request<Params, {}, Body> {
    user: User;
}
