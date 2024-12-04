import { Module } from '@nestjs/common';
import { ProductsImageController } from './products-image.controller';
import { ProductsImageService } from './products-image.service';
import { CloudinaryModule } from '../../services/cloudinary/cloudinary.module';
import { ProductsModule } from '../products/products.module';
import { IsOwnerProductGuard } from '../../common/guards/is-owner-product.guard';
import { IsOwnerProductImageGuard } from '../../common/guards/is-owner-product-image.guard';

@Module({
  controllers: [ProductsImageController],
  providers: [
    ProductsImageService,
    IsOwnerProductGuard,
    IsOwnerProductImageGuard,
  ],
  imports: [ProductsModule, CloudinaryModule],
})
export class ProductsImageModule {}
