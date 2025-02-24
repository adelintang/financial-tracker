import { ApiProperty } from '@nestjs/swagger';

export class ReportResponse {
  @ApiProperty({ example: 'report-cf5be6-9370-404f-aa-051cd1' })
  id: string;

  @ApiProperty({ example: 2 })
  month: number;

  @ApiProperty({ example: 2025 })
  year: number;

  @ApiProperty({ example: 4000000 })
  totalIncome: number;

  @ApiProperty({ example: 110000 })
  totalExpense: number;

  @ApiProperty({ example: 0 })
  totalInvestment: number;

  @ApiProperty({ example: '2025-02-24T07:33:11.713Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-02-24T07:33:11.713Z' })
  updatedAt: Date;

  @ApiProperty({ example: 'user-cca64-5fe-49ad-8b6-a775b' })
  userId: string;
}
