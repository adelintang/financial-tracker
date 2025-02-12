import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/providers/prisma/prisma.service';
import { CreateInvestmentTypeDto } from '../dto/create-investment-type.dto';
import { QueryParams } from 'src/types';

@Injectable()
export class InvestmentTypesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createInvestmentType(createInvestmentTypeDto: CreateInvestmentTypeDto) {
    return this.prisma.investmentType.create({
      data: {
        ...createInvestmentTypeDto,
      },
    });
  }

  async getInvestmentTypes(query: QueryParams) {
    const { search = '' } = query;
    return this.prisma.investmentType.findMany({
      where: {
        type: {
          contains: search.trim(),
        },
      },
    });
  }
}
