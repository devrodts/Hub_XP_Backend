export class FailOnCreation extends Error {
    constructor(message: string, public readonly statusCode: number) {
        super(message);
        this.name = message;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, FailOnCreation.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
