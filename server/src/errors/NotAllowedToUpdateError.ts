import { CustomError } from './CustomError.js';

export class NotAllowedToUpdateError extends CustomError {
    constructor(message: string = 'User is not allowed to update this') {
        super(403, message);
    }
}
