// src/errors/CustomError.ts

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
