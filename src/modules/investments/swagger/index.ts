import { ApiProperty } from '@nestjs/swagger';
import { GeneralResponseSwagger } from '../../../common/swagger';
import {
  GetInvestmentResponse,
  InvestmentReponse,
} from '../models/investments.reponse';
import { Const } from 'src/common/constans';

export class CreateInvestmentResponseSwagger extends GeneralResponseSwagger<InvestmentReponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.CREATED.INVESTMENT })
  message: string;

  @ApiProperty({ type: InvestmentReponse })
  data: InvestmentReponse;
}

export class GetInvestmentResponseSwagger extends GeneralResponseSwagger<GetInvestmentResponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.GET.INVESTMENT })
  message: string;

  @ApiProperty({ type: GetInvestmentResponse })
  data: GetInvestmentResponse;
}
