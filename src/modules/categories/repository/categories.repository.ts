import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/providers/prisma/prisma.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { QueryParams } from '../../../types';
import { TransactionType } from '@prisma/client';

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

  async getCategories(query: QueryParams & { type: TransactionType }) {
    const { search = '', type, page = '1', perPage = '10' } = query;
    return this.prisma.category.findMany({
      where: {
        OR: [{ name: { contains: search.trim() } }, { type }],
      },
      skip: (Number(page) - 1) * Number(perPage),
      take: Number(perPage),
    });
  }
}
