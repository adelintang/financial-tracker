import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { IAuthPayload } from '../../types';
import { CreateReportDto } from './dto/create-report.dto';
import { Utils } from '../../common/utils';
import { Const } from '../../common/constans';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ReportQueryParams } from './models/reports.interface';
import {
  GenerateMonthlyReportResponseSwagger,
  GetReportResponseSwagger,
  GetReportsResponseSwagger,
} from './swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('generate-monthly')
  @ApiOperation({ summary: 'Endpoint to Gererate Report' })
  @ApiCreatedResponse({
    description: 'Successfully created investment',
    type: GenerateMonthlyReportResponseSwagger,
  })
  async generateMonthlyReport(
    @Req() req: Request & { user: IAuthPayload },
    @Body() createReportDto: CreateReportDto,
  ) {
    const { user } = req;
    const report = await this.reportsService.generateMonthlyReport(
      user.userId,
      createReportDto,
    );
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.CREATED.REPORT,
      report,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Endpoint to Get Reports' })
  @ApiQuery({ name: 'month', required: false })
  @ApiQuery({ name: 'year', required: false })
  @ApiOkResponse({
    description: 'Successfully fetched investments',
    type: GetReportsResponseSwagger,
  })
  async getReports(
    @Req() req: Request & { user: IAuthPayload; query: ReportQueryParams },
  ) {
    const { user } = req;
    const { reports, meta } = await this.reportsService.getReports(
      user.userId,
      req.query,
    );
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.GET.REPORTS,
      reports,
      meta,
    );
  }

  @Get(':reportId')
  @ApiOperation({ summary: 'Endpoint to Get Report' })
  @ApiOkResponse({
    description: 'Successfully get investment',
    type: GetReportResponseSwagger,
  })
  async getReport(
    @Req() req: Request & { user: IAuthPayload },
    @Param('reportId') reportId: string,
  ) {
    const { user } = req;
    const report = await this.reportsService.getReport(user.userId, reportId);
    return Utils.Response('Success', Const.MESSAGE.SUCCESS.GET.REPORT, report);
  }
}
