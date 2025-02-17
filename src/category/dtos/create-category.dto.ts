import { CreateCategoryInterface } from "../interfaces";
import { Product } from "src/product/schemas/product.schema";
import { IsNotEmpty, IsString, IsDate, IsOptional, IsArray } from "class-validator";
export class CreateCategoryDTO implements CreateCategoryInterface {
    @IsNotEmpty()
    @IsString()
    _id: string
    @IsNotEmpty()
    @IsString()
    name: string
    @IsNotEmpty()
    @IsDate()
    createdAt: Date
    @IsNotEmpty()
    @IsDate()
    updatedAt: Date
    @IsOptional()
    @IsArray()
    products?:Product[]
}
