import { Module } from '@nestjs/common';
import { ProductsModule } from './app/products/products.module';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './app/auth/auth.module';
import { ProductsImageModule } from './app/products-image/products-image.module';
import { CommonModule } from './common/common.module';

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
export class AppModule {}
