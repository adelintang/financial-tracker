import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';

export class CategoryResonse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Makanan' })
  name: string;

  @ApiProperty({ enum: [TransactionType.INCOME, TransactionType.EXPENSE] })
  type: TransactionType;
}
