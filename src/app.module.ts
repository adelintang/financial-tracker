import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './common/common.module';
import { HttpLoggerMiddleware } from './common/middlewares/http-logger.middleware';
import { CategoriesModule } from './modules/categories/categories.module';
import { InvestmentTypesModule } from './modules/investment-types/investment-types.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { InvestmentsModule } from './modules/investments/investments.module';

@Module({
  imports: [
    CommonModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    InvestmentTypesModule,
    TransactionsModule,
    InvestmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
