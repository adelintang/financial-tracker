import { Injectable } from '@nestjs/common';
import { InvestmentTypesRepository } from './repository/investment-types.repository';
import { CreateInvestmentTypeDto } from './dto/create-investment-type.dto';
import { QueryParams } from '../../types';
import {
  investmentTypeMapper,
  investmentTypesMapper,
} from './mapper/investment-types.mapper';
import { InvestmentTypeResponse } from './models/investment-type.response';

@Injectable()
export class InvestmentTypesService {
  constructor(
    private readonly investmentTypesRepository: InvestmentTypesRepository,
  ) {}

  async createInvestmentType(
    createInvestmentTypeDto: CreateInvestmentTypeDto,
  ): Promise<InvestmentTypeResponse> {
    const createInvestmentType =
      await this.investmentTypesRepository.createInvestmentType(
        createInvestmentTypeDto,
      );
    return investmentTypeMapper(createInvestmentType);
  }

  async getInvestmentTypes(
    query: QueryParams,
  ): Promise<InvestmentTypeResponse[]> {
    const investmentTypes =
      await this.investmentTypesRepository.getInvestmentTypes(query);
    return investmentTypesMapper(investmentTypes);
  }
}
