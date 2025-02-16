import { ApiProperty } from '@nestjs/swagger';
import { GeneralResponseSwagger } from '../../../common/swagger';
import { InvestmentTypeResponse } from '../models/investment-type.response';
import { Const } from '../../../common/constans';

export class CreateInvestmentTypeResponseSwagger extends GeneralResponseSwagger<InvestmentTypeResponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.CREATED.INVESTMENT_TYPE })
  message: string;

  @ApiProperty({ type: InvestmentTypeResponse })
  data: InvestmentTypeResponse;
}

export class InvestmentTypesResponseSwagger extends GeneralResponseSwagger<
  InvestmentTypeResponse[]
> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.GET.INVESTMENT_TYPES })
  message: string;

  @ApiProperty({ type: [InvestmentTypeResponse] })
  data: InvestmentTypeResponse[];
}
