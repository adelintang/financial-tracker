import { Injectable } from '@nestjs/common';
import { InvestmentTypesRepository } from './repository/investment-types.repository';
import { CreateInvestmentTypeDto } from './dto/create-investment-type.dto';

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
}
