export class FailOnUpdate extends Error {
    constructor(message: string, public readonly statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        Object.setPrototypeOf(this, FailOnUpdate.prototype);
        Error.captureStackTrace(this, this.constructor);
    } 
}

