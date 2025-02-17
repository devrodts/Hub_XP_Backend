import { IsString, IsNotEmpty, IsArray, IsNumber } from 'class-validator';

export class CreateProductDTO {
    @IsNotEmpty()
    @IsString()
    readonly _id: string;

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsArray()
    @IsString({ each: true }) 
    readonly categoryIds: string[];

    @IsArray()
    @IsString({ each: true })
    readonly colors: string[];

    @IsNotEmpty()
    @IsString()
    readonly imageUrl: string;
}