import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsNotEmpty } from 'class-validator';

@Schema()
export class Product extends Document {
    
    @Prop({ required: true })
    @IsNotEmpty()
    _id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true, type: [String] }) // Garante que colors seja um array de strings
    colors: string[];

    @Prop({ required: true, type: [String] })
    categoryIds: string[];

    @Prop({ required: true })
    imageUrl: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
