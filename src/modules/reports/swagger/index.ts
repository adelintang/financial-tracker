import { ApiProperty } from '@nestjs/swagger';
import { GeneralResponseSwagger, MetaSwagger } from '../../../common/swagger';
import { ReportResponse } from '../models/report.reponse';
import { Const } from '../../../common/constans';

export class GenerateMonthlyReportResponseSwagger extends GeneralResponseSwagger<ReportResponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.CREATED.REPORT })
  message: string;

  @ApiProperty({ type: ReportResponse })
  data: ReportResponse;
}

export class GetReportsResponseSwagger extends GeneralResponseSwagger<
  ReportResponse[],
  MetaSwagger
> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.GET.REPORTS })
  message: string;

  @ApiProperty({ type: [ReportResponse] })
  data: ReportResponse[];

  @ApiProperty({ type: MetaSwagger })
  meta?: MetaSwagger;
}

export class GetReportResponseSwagger extends GenerateMonthlyReportResponseSwagger {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.GET.REPORT })
  message: string;
}
