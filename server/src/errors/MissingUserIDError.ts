import { CustomError } from './CustomError.js';

export class MissingUserIDError extends CustomError {
    constructor(message: string = 'User ID was not provided, but is required. It should be in the request parameters.') {
        super(400, message);
    }
}
