import { IsOptional, IsString, IsNotEmpty, IsDate, IsArray } from 'class-validator';
import { UpdateCategoryInterface } from '../interfaces';
import { Product } from 'src/product/schemas/product.schema';

export class UpdateCategoryDTO implements UpdateCategoryInterface {
    @IsOptional() 
    @IsString()
    readonly _id: string;

    @IsNotEmpty({ message: 'O nome da categoria não pode estar vazio' })
    @IsString({ message: 'O nome da categoria deve ser uma string' })
    readonly name: string;

    @IsNotEmpty({ message: 'A data de criação da categoria não pode estar vazia' })
    @IsDate({ message: 'A data de criação da categoria deve ser uma data' })
    readonly createdAt: Date;

    readonly updatedAt: Date;

    @IsOptional()
    @IsArray()
    readonly products: Product[];
}
