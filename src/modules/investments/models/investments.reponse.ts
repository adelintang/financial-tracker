import { ApiProperty } from '@nestjs/swagger';
import { InvestmentTypeResponse } from 'src/modules/investment-types/models/investment-type.response';
import { UserResponse } from 'src/modules/users/models/user.response';

class BaseInvestmentRespose {
  @ApiProperty({ example: 'investment-hf848-fhh66' })
  id: string;

  @ApiProperty({ example: 'Bitcoin' })
  name: string;

  @ApiProperty({ example: 1000000 })
  amount: number;

  @ApiProperty({ example: 1000000000 })
  valueBuy: number;

  @ApiProperty({ example: null })
  profitLoss?: number;

  @ApiProperty({ example: '2025-02-18T13:28:09.379Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-02-18T13:28:09.379Z' })
  updatedAt: Date;
}

export class InvestmentReponse extends BaseInvestmentRespose {
  @ApiProperty({ example: 'user-hf848-fhh66' })
  userId: string;

  @ApiProperty({ example: 8 })
  investmentTypeId: number;
}

export class GetInvestmentResponse extends BaseInvestmentRespose {
  @ApiProperty({ type: UserResponse })
  user: UserResponse;

  @ApiProperty({ type: InvestmentTypeResponse })
  investmentType: InvestmentTypeResponse;
}
