import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ReportsRepository } from './repository/reports.repository';
import { PrismaModule } from '../../common/providers/prisma/prisma.module';

@Module({
  providers: [ReportsService, ReportsRepository],
  controllers: [ReportsController],
  imports: [PrismaModule],
})
export class ReportsModule {}
