import { Module } from '@nestjs/common';
import { InvestmentsController } from './investments.controller';
import { InvestmentsService } from './investments.service';
import { InvestmentsRepository } from './repository/investments.repository';
import { PrismaModule } from '../../common/providers/prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { InvestmentTypesModule } from '../investment-types/investment-types.module';

@Module({
  controllers: [InvestmentsController],
  providers: [InvestmentsService, InvestmentsRepository],
  imports: [PrismaModule, UsersModule, InvestmentTypesModule],
})
export class InvestmentsModule {}
