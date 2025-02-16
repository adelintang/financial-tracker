import { Injectable } from '@nestjs/common';
import { TransactionType } from '@prisma/client';
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
    return this.prisma.category.findMany({
      where: {
        OR: [{ name: { contains: search.trim() } }, { type }],
      },
    });
  }
}
