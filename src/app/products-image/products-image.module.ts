import { Module } from '@nestjs/common';
import { ProductsImageController } from './products-image.controller';
import { ProductsImageService } from './products-image.service';
import { ProductsModule } from '../products/products.module';
import { IsOwnerProductGuard } from '../../common/guards/is-owner-product.guard';
import { IsOwnerProductImageGuard } from '../../common/guards/is-owner-product-image.guard';
import { ProductsImageRepository } from './repository/products-image.repository';
import { PrismaModule } from '../../common/providers/prisma/prisma.module';
import { CloudinaryModule } from '../../common/providers/cloudinary/cloudinary.module';

@Module({
  controllers: [ProductsImageController],
  providers: [
    ProductsImageService,
    ProductsImageRepository,
    IsOwnerProductGuard,
    IsOwnerProductImageGuard,
  ],
  imports: [ProductsModule, PrismaModule, CloudinaryModule],
})
export class ProductsImageModule {}
