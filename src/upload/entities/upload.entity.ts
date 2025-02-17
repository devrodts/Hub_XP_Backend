import { Prop, Schema } from "@nestjs/mongoose";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
@Schema()

export class Upload {
    @Prop({ required: true })
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    _id: string;

    @Prop({ required: true })
    imageUrl: string;

    @Prop({ required: true })
    createdAt: Date;

    @Prop({ required: true })
    updatedAt: Date;
}