import { ApiProperty } from '@nestjs/swagger';

export class InvestmentTypeResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Crypto' })
  type: string;
}
