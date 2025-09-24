// src/errors/NotFoundError.ts

import { CustomError } from './CustomError.js';

export class UserAlreadyExistsError extends CustomError {
    constructor(message: string = 'UserAlreadyExistsError') {
        super(409, message);
    }
}
