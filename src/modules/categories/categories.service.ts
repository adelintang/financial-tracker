import { BadRequestException, Injectable } from '@nestjs/common';
import { TransactionType } from '@prisma/client';
import { CategoriesRepository } from './repository/categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { QueryParams } from '../../types';
import { CategoryResonse } from './models/category.response';
import { categoriesMapper, categoryMapper } from './mapper/categories.mapper';
import { Const } from '../../common/constans';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResonse> {
    const existingCategory = await this.categoriesRepository.getCategoryByName(
      createCategoryDto.name,
    );
    if (existingCategory) {
      throw new BadRequestException(Const.MESSAGE.ERROR.BAD_REQUEST.CATEGORY);
    }
    const createCategory =
      await this.categoriesRepository.createCategory(createCategoryDto);
    return categoryMapper(createCategory);
  }

  async getCategories(
    query: QueryParams & { type: TransactionType },
  ): Promise<CategoryResonse[]> {
    const categories = await this.categoriesRepository.getCategories(query);
    return categoriesMapper(categories);
  }
}
