import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsEnum(TransactionType)
  @ApiProperty({ enum: [TransactionType.EXPENSE, TransactionType.INCOME] })
  type: TransactionType;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'amount of transaction',
    example: 100000,
  })
  amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'description of transaction',
    example: 'membeli beras 10kg',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'id of user',
    example: 'user-hdh77-hdh666',
  })
  userId: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'id of category',
    example: 1,
  })
  categoryId: number;
}
