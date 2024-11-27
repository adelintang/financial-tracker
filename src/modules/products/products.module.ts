import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { IsOwnerGuard } from '../../common/guards/is-owner.guard';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, IsOwnerGuard],
  imports: [PrismaModule, UsersModule],
  exports: [ProductsService],
})
export class ProductsModule {}
