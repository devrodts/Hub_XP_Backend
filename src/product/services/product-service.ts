import { Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { ProductRepository } from "../repositories/product.repository";
import { CreateProductDTO, UpdateProductDTO } from "../dtos";
import { Product } from "../schemas/product.schema";
import { S3 } from 'aws-sdk';

@Injectable()
export class ProductService {
    private readonly s3Client: S3;

    constructor(
        private readonly productRepository: ProductRepository,
    ) {
        this.s3Client = new S3({
            endpoint: 'http://localhost:4566',
            s3ForcePathStyle: true,
            region: 'us-east-1',
        });
    }

    private async ensureImageBucketExists() {
        const bucketName = 'products-images';
        try {
            const buckets = await this.s3Client.listBuckets().promise();
            const bucketExists = buckets.Buckets?.some(bucket => bucket.Name === bucketName);
            
            if (!bucketExists) {
                await this.s3Client.createBucket({ Bucket: bucketName }).promise();
            }
        } catch (error) {
            console.error('Failed to ensure bucket exists:', error);
            throw new InternalServerErrorException('Failed to initialize storage service');
        }
    }

    async createProduct(createProductDto: CreateProductDTO): Promise<Product> {
        await this.ensureImageBucketExists();
        return this.productRepository.createProduct(createProductDto);
    }

    async getProductById(_id: string): Promise<Product | null> {
        const product = await this.productRepository.findById(_id);
        if (!product) {
            throw new NotFoundException(`Product with ID ${_id} not found`);
        }
        return product;
    }

    async findAllProducts(): Promise<Product[]> {
        return this.productRepository.findAll();
    }

    async updateProductById(_id: string, updateProductDto: UpdateProductDTO): Promise<Product | null> {
        return this.productRepository.updateById(_id, updateProductDto);
    }

    async deleteProductById(_id: string): Promise<Product | null> {
        const product = await this.productRepository.deleteProductById(_id);
        if (!product) {
            throw new NotFoundException(`Product with ID ${_id} not found`);
        }
        return product;
    }
}
