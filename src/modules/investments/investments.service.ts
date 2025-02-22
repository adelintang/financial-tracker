import { Injectable } from '@nestjs/common';
import { InvestmentsRepository } from './repository/investments.repository';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UsersService } from '../users/users.service';
import { InvestmentTypesService } from '../investment-types/investment-types.service';

@Injectable()
export class InvestmentsService {
  constructor(
    private readonly investmentsRepository: InvestmentsRepository,
    private readonly usersService: UsersService,
    private readonly investmentTypesService: InvestmentTypesService,
  ) {}

  async createInvestment(createInvestmentDto: CreateInvestmentDto) {
    await this.usersService.getUser(createInvestmentDto.userId);
    await this.investmentTypesService.getInvestmentType(
      createInvestmentDto.investmentTypeId,
    );
    return this.investmentsRepository.createInvestment(createInvestmentDto);
  }
}
