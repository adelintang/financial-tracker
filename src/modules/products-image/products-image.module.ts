import { Module } from '@nestjs/common';
import { ProductsImageController } from './products-image.controller';
import { ProductsImageService } from './products-image.service';

@Module({
  controllers: [ProductsImageController],
  providers: [ProductsImageService],
})
export class ProductsImageModule {}
