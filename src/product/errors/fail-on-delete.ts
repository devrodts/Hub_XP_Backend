export class FailOnDelete extends Error {
    constructor(message: string, public readonly statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        Object.setPrototypeOf(this, FailOnDelete.prototype);
        Error.captureStackTrace(this, this.constructor);
    } 
}

