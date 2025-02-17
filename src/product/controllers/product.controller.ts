import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductService } from '../services/product-service';
import { CreateProductDTO, UpdateProductDTO } from '../dtos';
import { Product } from '../schemas/product.schema';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDTO): Promise<Product> {
    return this.productService.createProduct(createProductDto);
  }

  @Get(':_id')
  async findById(@Param('_id') _id: string): Promise<Product | null> {
    return this.productService.getProductById(_id);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAllProducts();
  }

  @Put(':_id')
  async update(@Param('_id') _id: string, @Body() updateProductDto: UpdateProductDTO): Promise<Product | null> {
    return this.productService.updateProductById(_id, updateProductDto);
  }

  @Delete(':_id')
  async delete(@Param('_id') _id: string): Promise<Product | null> {
    return this.productService.deleteProductById(_id);
  }
}
