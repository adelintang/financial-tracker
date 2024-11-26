import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Const } from '../../common/constans';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: Const.ROLES_GUARD_PROVIDER,
      useClass: RolesGuard,
    },
  ],
  imports: [PrismaModule, UsersModule],
})
export class ProductsModule {}
