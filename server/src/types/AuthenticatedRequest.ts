// types/AuthenticatedRequest.ts
import { Request } from "express";
import { IUser } from "../models/IUser.js"; // Adjust the path based on your actual User model

export interface AuthenticatedRequest extends Request {
    user: IUser; // or whatever your user type is
}
