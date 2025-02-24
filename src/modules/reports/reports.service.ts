import { BadRequestException, Injectable } from '@nestjs/common';
import { ReportsRepository } from './repository/reports.repository';
import { CreateReportDto } from './dto/create-report.dto';
import { Const } from '../../common/constans';
import { Utils } from '../../common/utils';

@Injectable()
export class ReportsService {
  constructor(private readonly reportsRepository: ReportsRepository) {}

  async generateMonthlyReport(
    userId: string,
    createReportDto: CreateReportDto,
  ) {
    Utils.validateLastDateInMonth(createReportDto.month);
    const existingReport = await this.reportsRepository.checkExistingReport(
      userId,
      createReportDto,
    );
    if (existingReport) {
      throw new BadRequestException(Const.MESSAGE.ERROR.BAD_REQUEST.REPORT);
    }
    return this.reportsRepository.generateMonthlyReport(
      userId,
      createReportDto,
    );
  }
}
