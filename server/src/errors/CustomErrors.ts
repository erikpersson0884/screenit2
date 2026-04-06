
export class CustomError extends Error {
    statusCode: number;
    message: string;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        Object.setPrototypeOf(this, new.target.prototype); // To ensure proper instanceof behavior
    }
}


export class NotAllowedToModifyEventError extends CustomError {
    constructor(message: string = "You are not allowed to modify this event (only admins or the creator of the event can do so)") {
        super(403, message);
    }
}

export class UnauthorizedActionError extends CustomError {
    constructor(message: string = 'This aciton is prohibited for your user role.') {
        super(400, message);
    }
}

export class UserAlreadyExistsError extends CustomError {
    constructor(message: string = 'UserAlreadyExistsError') {
        super(409, message);
    }
}

export class UserNotFoundError extends CustomError {
    constructor(message: string = 'User was not found') {
        super(404, message);
    }
}

export class MissingUserIDError extends CustomError {
    constructor(message: string = 'User ID was not provided, but is required. It should be in the request parameters.') {
        super(400, message);
    }
}

export class MissingFileError extends CustomError {
    constructor(message: string = 'File was not uploaded') {
        super(400, message);
    }
}


export default CustomError;
