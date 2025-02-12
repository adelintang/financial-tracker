import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInvestmentTypeDto {
  @IsString()
  @IsNotEmpty()
  type: string;
}
