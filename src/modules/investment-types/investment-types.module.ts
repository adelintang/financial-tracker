import { Module } from '@nestjs/common';
import { InvestmentTypesService } from './investment-types.service';
import { InvestmentTypesController } from './investment-types.controller';
import { InvestmentTypesRepository } from './repository/investment-types.repository';
import { PrismaModule } from '../../common/providers/prisma/prisma.module';

@Module({
  providers: [InvestmentTypesService, InvestmentTypesRepository],
  controllers: [InvestmentTypesController],
  imports: [PrismaModule],
})
export class InvestmentTypesModule {}
