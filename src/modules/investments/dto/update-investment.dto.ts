import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateInvestmentDto } from './create-investment.dto';

export class UpdateInvestmentDto extends PartialType(
  OmitType(CreateInvestmentDto, ['userId', 'investmentTypeId'] as const),
) {}
