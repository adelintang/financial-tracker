import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsImageModule } from './modules/products-image/products-image.module';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    ConfigModule.forRoot(),
    AuthModule,
    ProductsImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
