import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { IAuthPayload } from '../../types';
import { CreateReportDto } from './dto/create-report.dto';
import { Utils } from '../../common/utils';
import { Const } from '../../common/constans';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('generate-monthly')
  @ApiOperation({ summary: 'Endpoint to Gererate Report' })
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
}
