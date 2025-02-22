import { ApiProperty } from '@nestjs/swagger';
import { GeneralResponseSwagger } from '../../../common/swagger';
import { InvestmentReponse } from '../models/investments.reponse';
import { Const } from 'src/common/constans';

export class createInvestmentResponseSwagger extends GeneralResponseSwagger<InvestmentReponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.CREATED.INVESTMENT })
  message: string;

  @ApiProperty({ type: InvestmentReponse })
  data: InvestmentReponse;
}
