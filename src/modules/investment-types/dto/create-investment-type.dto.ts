import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInvestmentTypeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'name of type investment',
    example: 'Crypto',
  })
  type: string;
}
