import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { UsersModule } from '../users/users.module';
import { IsOwnerProductGuard } from '../../common/guards/is-owner-product.guard';
import { ProductsRepository } from './repository/products.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, IsOwnerProductGuard],
  imports: [UsersModule],
  exports: [ProductsService],
})
export class ProductsModule {}
