import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from '../services/category-service';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos';

@Controller('categories')
export class CategoryController{
  constructor(private readonly categoryService: CategoriesService){

  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDTO) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.categoryService.findOne(_id);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateCategoryDto: UpdateCategoryDTO) {
    return this.categoryService.update(_id, updateCategoryDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.categoryService.remove(_id);
  }
}
