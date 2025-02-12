import { Injectable } from '@nestjs/common';
import { InvestmentTypesRepository } from './repository/investment-types.repository';
import { CreateInvestmentTypeDto } from './dto/create-investment-type.dto';
import { QueryParams } from 'src/types';

@Injectable()
export class InvestmentTypesService {
  constructor(
    private readonly investmentTypesRepository: InvestmentTypesRepository,
  ) {}

  async createInvestmentType(createInvestmentTypeDto: CreateInvestmentTypeDto) {
    return this.investmentTypesRepository.createInvestmentType(
      createInvestmentTypeDto,
    );
  }

  async getInvestmentTypes(query: QueryParams) {
    return this.investmentTypesRepository.getInvestmentTypes(query);
  }
}
