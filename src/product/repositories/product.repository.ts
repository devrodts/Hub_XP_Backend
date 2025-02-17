import { Injectable, NotFoundException } from '@nestjs/common';  
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schemas/';
import { CreateProductDTO, UpdateProductDTO } from '../dtos';

@Injectable()
export class ProductRepository {
    private readonly productModel: Model<Product>;
    

    async createProduct(productDto: CreateProductDTO): Promise<Product> {
        return this.productModel.create(productDto);
    }

    async findById(_id: string): Promise<Product | null> {
        const product = await this.productModel.findById(_id).exec();
        if (!product) {
            throw new NotFoundException(`Product with ID ${_id} not found`);
        }
        return product;
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async updateById(_id: string, updateProductDto: UpdateProductDTO): Promise<Product | null> {
        const existingProduct = await this.productModel.findById(_id).exec();
        if (!existingProduct) {
            throw new NotFoundException(`Product with ID ${_id} not found`);
        }
        return this.productModel.findByIdAndUpdate(_id, updateProductDto, { new: true, lean: true }).exec();
    }

    async deleteProductById(_id: string): Promise<Product | null> {
        return this.productModel.findByIdAndDelete(_id).exec();
    }
}
