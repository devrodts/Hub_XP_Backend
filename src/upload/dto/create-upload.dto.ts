export class CreateUploadDTO {
    readonly originalname: string;
    readonly buffer: Buffer;
    readonly mimetype: string;
}