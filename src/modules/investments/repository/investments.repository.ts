import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../../../common/providers/prisma/prisma.service';
import { CreateInvestmentDto } from '../dto/create-investment.dto';
import { UpdateInvestmentDto } from '../dto/update-investment.dto';

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

  async getInvestment(investmentId: string) {
    return this.prisma.investment.findUnique({
      where: {
        id: investmentId,
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
