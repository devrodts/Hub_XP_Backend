export class FailOnSearchProduct extends Error {
    constructor(message: string, public readonly statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, FailOnSearchProduct.prototype);
        Error.captureStackTrace(this, this.constructor);
    }   
}

