import { Module } from '@nestjs/common';
import { ProductsImageController } from './products-image.controller';
import { ProductsImageService } from './products-image.service';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';
import { ProductsModule } from '../products/products.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { IsOwnerGuard } from '../../common/guards/is-owner.guard';

@Module({
  controllers: [ProductsImageController],
  providers: [ProductsImageService, IsOwnerGuard],
  imports: [PrismaModule, ProductsModule, CloudinaryModule],
})
export class ProductsImageModule {}
