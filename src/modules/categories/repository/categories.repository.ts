import { Injectable } from '@nestjs/common';
import { Prisma, TransactionType } from '@prisma/client';
import { PrismaService } from '../../../common/providers/prisma/prisma.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { QueryParams } from '../../../types';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
      },
    });
  }

  async getCategoryByName(name: string) {
    return this.prisma.category.findUnique({ where: { name } });
  }

  async getCategories(query: QueryParams & { type: TransactionType }) {
    const { search = '', type } = query;
    const whereCondition: Prisma.CategoryWhereInput = {};
    if (search) {
      whereCondition.OR = [{ name: { contains: search.trim() } }];
    }
    if (type) {
      whereCondition.AND = { type };
    }
    return this.prisma.category.findMany({
      where: whereCondition,
    });
  }
}
