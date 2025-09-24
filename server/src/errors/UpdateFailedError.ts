import { CustomError } from './CustomError.js';

export class UpdateFailedError extends CustomError {
    constructor(message: string = 'Update was unsuccessful') {
        super(500, message);
    }
}
