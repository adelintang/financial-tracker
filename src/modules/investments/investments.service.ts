import { Injectable, NotFoundException } from '@nestjs/common';
import { InvestmentsRepository } from './repository/investments.repository';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UsersService } from '../users/users.service';
import { InvestmentTypesService } from '../investment-types/investment-types.service';
import { Const } from '../../common/constans';
import { InvestmentReponse } from './models/investments.reponse';
import {
  investmentMapper,
  investmentsMapper,
} from './mapper/investments.mapper';
import {
  IInvestment,
  InvestmentQueryParams,
} from './models/investments.interface';
import { Utils } from '../../common/utils';

@Injectable()
export class InvestmentsService {
  constructor(
    private readonly investmentsRepository: InvestmentsRepository,
    private readonly usersService: UsersService,
    private readonly investmentTypesService: InvestmentTypesService,
  ) {}

  async createInvestment(
    createInvestmentDto: CreateInvestmentDto,
  ): Promise<InvestmentReponse> {
    await this.usersService.getUser(createInvestmentDto.userId);
    await this.investmentTypesService.getInvestmentType(
      createInvestmentDto.investmentTypeId,
    );
    return this.investmentsRepository.createInvestment(createInvestmentDto);
  }

  async getInvestments(userId: string, query: InvestmentQueryParams) {
    const { page = '1', perPage = '10' } = query;
    const [investments, totalData] = await Promise.all([
      this.investmentsRepository.getInvestments(userId, query),
      this.investmentsRepository.getInvestmentsCount(userId, query),
    ]);
    const meta = Utils.MetaPagination(
      Number(page),
      Number(perPage),
      investments.length,
      totalData,
    );
    return {
      investments: investmentsMapper(investments as IInvestment[]),
      meta,
    };
  }

  async getInvestment(userId: string, investmentId: string) {
    const investment = await this.investmentsRepository.getInvestment(
      userId,
      investmentId,
    );
    if (!investment) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.INVESTMENT);
    }
    return investmentMapper(investment);
  }
}
