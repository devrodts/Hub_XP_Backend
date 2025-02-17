import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../schemas/category.schema';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos'; 

@Injectable()
export class CategoryRepository {
    constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {}

    async createCategory(categoryDto: CreateCategoryDTO): Promise<Category> {
        return this.categoryModel.create(categoryDto);
    }

    async findById(_id: string): Promise<Category | null> {
        const category = await this.categoryModel.findById(_id).exec();
            if (!category) {
            throw new NotFoundException(`Category with ID ${_id} not found`);
        }
        return category;
    }

    async findAll(): Promise<Category[]> {
        return this.categoryModel.find().exec();
    }

    async updateById(_id: string, updateCategoryDto: UpdateCategoryDTO): Promise<Category | null> {
     
        const existingCategory = await this.categoryModel.findById(_id).exec();
        if (!existingCategory) {
                throw new NotFoundException(`Category with ID ${_id} not found`);
        }
        const updatedCategory = await this.categoryModel.findByIdAndUpdate(_id, updateCategoryDto, { new: true, lean: true }).exec();
        return updatedCategory;
    }

    async deleteCategoryById(_id: string): Promise<Category | null> {
        return this.categoryModel.findByIdAndDelete(_id).exec();
    }
}
