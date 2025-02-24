import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../../../common/providers/prisma/prisma.service';
import { CreateReportDto } from '../dto/create-report.dto';
import { ReportQueryParams } from '../models/reports.interface';

@Injectable()
export class ReportsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async checkExistingReport(userId: string, createReportDto: CreateReportDto) {
    return this.prisma.report.findFirst({
      where: {
        userId,
        month: createReportDto.month,
        year: createReportDto.year,
      },
    });
  }

  async generateMonthlyReport(
    userId: string,
    createReportDto: CreateReportDto,
  ) {
    const { month, year } = createReportDto;
    const transactions = await this.prisma.transaction.groupBy({
      by: ['type'],
      where: {
        userId,
        createdAt: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      },
      _sum: {
        amount: true,
      },
    });

    const totalExpense =
      transactions.find((transaction) => transaction.type === 'EXPENSE')?._sum
        .amount ?? 0;
    const totalIncome =
      transactions.find((transaction) => transaction.type === 'INCOME')?._sum
        .amount ?? 0;

    const investments = await this.prisma.investment.aggregate({
      where: {
        userId,
        createdAt: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      },
      _sum: {
        amount: true,
      },
    });

    const totalInvestment = investments._sum.amount ?? 0;

    return this.prisma.report.create({
      data: {
        id: `report-${uuidv4()}`,
        month,
        year,
        totalExpense,
        totalIncome,
        totalInvestment,
        userId,
      },
    });
  }

  async getReports(userId: string, query: ReportQueryParams) {
    const { month, year, page = '1', perPage = '10' } = query;
    const whereCondition: Prisma.ReportWhereInput = { userId };
    if (month) {
      whereCondition.OR = [{ month: Number(month) }];
    }
    if (year) {
      whereCondition.AND = { year: Number(year) };
    }
    return this.prisma.report.findMany({
      where: whereCondition,
      skip: (Number(page) - 1) * Number(perPage),
      take: Number(perPage),
    });
  }

  async getReportsCount(userId: string, query: ReportQueryParams) {
    const { month, year } = query;
    const whereCondition: Prisma.ReportWhereInput = { userId };
    if (month) {
      whereCondition.OR = [{ month: Number(month) }];
    }
    if (year) {
      whereCondition.AND = { year: Number(year) };
    }
    return this.prisma.report.count({
      where: whereCondition,
    });
  }

  async getReport() {}
}
