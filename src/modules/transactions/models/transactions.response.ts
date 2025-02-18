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
  createdAt: string;

  @ApiProperty({ example: '2025-02-18T13:28:09.379Z' })
  updatedAt: string;
}
