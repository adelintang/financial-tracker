import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'name of category',
    example: 'Makanan',
  })
  name: string;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  @ApiProperty({ enum: [TransactionType.EXPENSE, TransactionType.INCOME] })
  type: TransactionType;
}
