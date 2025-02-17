import { Prop } from '@nestjs/mongoose';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOrderDTO {

  @IsUUID()
  @IsOptional()
  _id:string 

  @IsNumber()
  @IsNotEmpty()
  @Prop({ required: true })
  total: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  productIds: string[];
}