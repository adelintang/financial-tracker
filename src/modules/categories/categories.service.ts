import { Injectable } from '@nestjs/common';
import { TransactionType } from '@prisma/client';
import { CategoriesRepository } from './repository/categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { QueryParams } from '../../types';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    return this.categoriesRepository.createCategory(createCategoryDto);
  }

  async getCategories(query: QueryParams & { type: TransactionType }) {
    return this.categoriesRepository.getCategories(query);
  }
}
