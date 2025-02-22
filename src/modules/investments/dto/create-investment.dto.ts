import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateInvestmentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'name of investment',
    example: 'Bitcoin',
  })
  name: string;

  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'amount of investment',
    example: '1000000',
  })
  amount: number;

  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'value buy of investment',
    example: '1000000000',
  })
  valueBuy: number;

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
    description: 'id of investment type',
    example: 8,
  })
  investmentTypeId: number;
}
