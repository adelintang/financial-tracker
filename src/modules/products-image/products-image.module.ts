import { Module } from '@nestjs/common';
import { ProductsImageController } from './products-image.controller';
import { ProductsImageService } from './products-image.service';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';
import { ProductsModule } from '../products/products.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [ProductsImageController],
  providers: [ProductsImageService],
  imports: [PrismaModule, ProductsModule, CloudinaryModule],
})
export class ProductsImageModule {}
