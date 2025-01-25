import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductsModule } from './app/products/products.module';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './app/auth/auth.module';
import { ProductsImageModule } from './app/products-image/products-image.module';
import { CommonModule } from './common/common.module';
import { HttpLoggerMiddleware } from './common/middlewares/http-logger.middleware';

@Module({
  imports: [
    CommonModule,
    ProductsModule,
    UsersModule,
    AuthModule,
    ProductsImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
