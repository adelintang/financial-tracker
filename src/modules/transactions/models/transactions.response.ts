import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';

export class TransactionResponse {
  @ApiProperty({ example: 'transaction-hf848-fhh66' })
  id: string;

  @ApiProperty({ enum: [TransactionType.EXPENSE, TransactionType.INCOME] })
  type: TransactionType;

  @ApiProperty({ example: 10000 })
  amount: number;

  @ApiProperty({ example: 'membeli beras 10kg' })
  description: string;

  @ApiProperty({ example: '2025-02-18T13:28:09.379Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-02-18T13:28:09.379Z' })
  updatedAt: Date;
}

export class IncomeTransactionResponse extends TransactionResponse {
  @ApiProperty({ enum: [TransactionType.INCOME, TransactionType.EXPENSE] })
  type: TransactionType;

  @ApiProperty({ example: 4000000 })
  amount: number;

  @ApiProperty({ example: 'gaji bulan febuari' })
  description: string;
}
