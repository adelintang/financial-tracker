import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './repository/categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    return this.categoriesRepository.createCategory(createCategoryDto);
  }
}
