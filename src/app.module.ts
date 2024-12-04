import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsImageModule } from './modules/products-image/products-image.module';
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
