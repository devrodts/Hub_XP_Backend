import { Test, TestingModule } from '@nestjs/testing';
import { ProductServices } from '../services/product-service';

describe('ProductService', () => {
  let service: ProductServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductServices],
    }).compile();

    service = module.get<ProductServices>(ProductServices);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
