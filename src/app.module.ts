import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './common/common.module';
import { HttpLoggerMiddleware } from './common/middlewares/http-logger.middleware';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [CommonModule, UsersModule, AuthModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
