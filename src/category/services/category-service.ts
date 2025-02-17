import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos';
import { Category } from '../schemas';
import { FailDeleteCategory } from '../errors/fail-delete-category-error';

@Injectable()

export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDTO): Promise<Category> {

    const createdCategory = new this.categoryModel(createCategoryDto);
    
    return createdCategory.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(_id: string, updateCategoryDto: UpdateCategoryDTO): Promise<Category> {
    const existingCategory = await this.categoryModel.findByIdAndUpdate(
      _id,
      updateCategoryDto,
      { new: true },
    ).exec();
    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${_id} not found`);
    }
    return existingCategory;
  }

  async remove(_id: string): Promise<Category> {
    try{
      const deletedCategory = await this.categoryModel.findByIdAndDelete(_id).exec();
      if (!deletedCategory) {
        throw new NotFoundException(`Category with ID ${_id} not found`);
      }
      return deletedCategory;
    }catch{
      throw new FailDeleteCategory("Failed to delete category", 500);
    }
  }
}
