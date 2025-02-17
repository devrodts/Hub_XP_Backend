export class FailDeleteCategory extends Error {
    constructor(message: string, statusCode: number) {
        super(message);
        this.name = "FailDeleteCategory";
    }
}
