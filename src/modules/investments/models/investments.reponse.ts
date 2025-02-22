import { ApiProperty } from '@nestjs/swagger';

export class InvestmentReponse {
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

  @ApiProperty({ example: 'user-hf848-fhh66' })
  userId: string;

  @ApiProperty({ example: 8 })
  investmentTypeId: number;

  @ApiProperty({ example: '2025-02-18T13:28:09.379Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-02-18T13:28:09.379Z' })
  updatedAt: Date;
}
