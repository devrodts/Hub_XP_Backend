import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../schemas/';
import { ProductRepository } from '../repositories/product.repository';
import { ProductService } from '../services/product-service';
import { ProductController } from '../controllers/product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductRepository], 
})
export class ProductModule {}
