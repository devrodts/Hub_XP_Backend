import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from '../schemas/category.schema';
import { CategoryController } from '../controllers/category.controller';
import { Category } from '../schemas/category.schema';
import { CategoriesService } from '../services/category-service';
import { CategoryRepository } from '../repositories/categories.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoriesService, CategoryRepository],
  exports: [CategoryRepository], 
})
export class CategoriesModule {}
