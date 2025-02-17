import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.schema';

@Injectable()
export class FindProductById{
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

    async findById(id: string): Promise<Product | null> {
        return this.productModel.findById(id).exec();
    }
}
