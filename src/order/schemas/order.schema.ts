import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDateString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';

@Schema()
export class Order extends Document {

  @IsUUID()
  @IsNotEmpty()
  @Prop({ required: true })
  _id: string;

  @IsNumber()
  @IsNotEmpty()
  @Prop({ required: true })
  total: number;

  @IsDateString()
  @IsNotEmpty()
  @Prop({ required: true })
  createdAt: Date;

  @IsDateString()
  @IsNotEmpty()
  @Prop({ required: true })
  updatedAt: Date;
  
  @Prop({type: [{ type: mongoose.Types.ObjectId, ref: 'Product'}]})
  products: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
