import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../../../common/providers/prisma/prisma.service';
import { CreateInvestmentDto } from '../dto/create-investment.dto';
import { UpdateInvestmentDto } from '../dto/update-investment.dto';
import { InvestmentQueryParams } from '../models/investments.interface';

@Injectable()
export class InvestmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createInvestment(createInvestmentDto: CreateInvestmentDto) {
    return this.prisma.investment.create({
      data: {
        id: `investment-${uuidv4()}`,
        ...createInvestmentDto,
      },
    });
  }

  async getInvestments(userId: string, query: InvestmentQueryParams) {
    const { search = '', date, type, page = '1', perPage = '10' } = query;
    return this.prisma.investment.findMany({
      where: {
        userId,
        name: {
          contains: search.trim(),
        },
        createdAt: date,
        investmentType: {
          type,
        },
      },
      skip: (Number(page) - 1) * Number(perPage),
      take: Number(perPage),
      include: {
        investmentType: true,
      },
    });
  }

  async getInvestmentsCount(userId: string, query: InvestmentQueryParams) {
    const { search = '', date, type } = query;
    return this.prisma.investment.count({
      where: {
        userId,
        name: {
          contains: search.trim(),
        },
        createdAt: date,
        investmentType: {
          type,
        },
      },
    });
  }

  async getInvestment(userId: string, investmentId: string) {
    return this.prisma.investment.findUnique({
      where: {
        id: investmentId,
        userId,
      },
      include: {
        user: true,
        investmentType: true,
      },
    });
  }

  async updateInvestment(
    investmentId: string,
    updateInvestmentDto: UpdateInvestmentDto,
  ) {
    return this.prisma.investment.update({
      where: {
        id: investmentId,
      },
      data: {
        ...updateInvestmentDto,
      },
    });
  }

  async deleteInvestment(investmentId: string) {
    return this.prisma.investment.delete({
      where: {
        id: investmentId,
      },
    });
  }
}
