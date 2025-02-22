import { ApiProperty } from '@nestjs/swagger';
import { GeneralResponseSwagger, MetaSwagger } from '../../../common/swagger';
import {
  GetInvestmentResponse,
  GetInvestmentsResponse,
  InvestmentReponse,
} from '../models/investments.reponse';
import { Const } from 'src/common/constans';

export class CreateInvestmentResponseSwagger extends GeneralResponseSwagger<InvestmentReponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.CREATED.INVESTMENT })
  message: string;

  @ApiProperty({ type: InvestmentReponse })
  data: InvestmentReponse;
}

export class UpdateInvestmentResponseSwagger extends CreateInvestmentResponseSwagger {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.UPDATED.INVESTMENT })
  message: string;
}

export class DeleteInvestmentResponseSwagger extends CreateInvestmentResponseSwagger {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.UPDATED.INVESTMENT })
  message: string;
}

export class GetInvestmentResponseSwagger extends GeneralResponseSwagger<GetInvestmentResponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.GET.INVESTMENT })
  message: string;

  @ApiProperty({ type: GetInvestmentResponse })
  data: GetInvestmentResponse;
}

export class GetInvestmentsResponseSwagger extends GeneralResponseSwagger<
  GetInvestmentsResponse[],
  MetaSwagger
> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.GET.INVESTMENTS })
  message: string;

  @ApiProperty({ type: [GetInvestmentsResponse] })
  data: GetInvestmentsResponse[];

  @ApiProperty({ type: MetaSwagger })
  meta?: MetaSwagger;
}
