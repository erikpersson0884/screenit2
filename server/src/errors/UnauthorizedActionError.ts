import { CustomError } from './CustomError.js';

export class UnauthorizedActionError extends CustomError {
    constructor(message: string = 'This aciton is prohibited for your user role.') {
        super(400, message);
    }
}
