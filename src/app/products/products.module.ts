import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { UsersModule } from '../users/users.module';
import { IsOwnerProductGuard } from '../../common/guards/is-owner-product.guard';
import { ProductsRepository } from './repository/products.repository';
import { PrismaModule } from '../../common/providers/prisma/prisma.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, IsOwnerProductGuard],
  imports: [UsersModule, PrismaModule],
  exports: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
