import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TransactionsRepository } from './repository/transactions-repository';
import { PrismaModule } from '../../common/providers/prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsRepository],
  imports: [PrismaModule, UsersModule, CategoriesModule],
})
export class TransactionsModule {}
