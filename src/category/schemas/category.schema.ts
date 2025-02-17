import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {Product} from "../../product/schemas/product.schema"

@Schema()
export class Category extends Document {
  @Prop({ required: true })
  _id: string;  
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  createdAt: Date;
  @Prop({ required: true })
  updatedAt: Date;
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], required: false })
  products?: Product[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
