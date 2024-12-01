import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';

@Injectable()
export class ProductsImageService {
  constructor(private readonly prisma: PrismaService) {}

  async createProductImage(createProductImageDto: CreateProductImageDto) {
    return this.prisma.productImage.create({
      data: {
        public_id: createProductImageDto.public_id,
        file_url: createProductImageDto.file_url,
        filename: createProductImageDto.filename,
        size: createProductImageDto.size,
        product_id: createProductImageDto.product_id,
      },
    });
  }

  async updateProductImage(
    id: string,
    updateProductImageDto: UpdateProductImageDto,
  ) {
    return this.prisma.productImage.update({
      where: {
        id,
      },
      data: { ...updateProductImageDto },
    });
  }

  async deleteProductImage(id: string) {
    return this.prisma.productImage.delete({
      where: {
        id,
      },
    });
  }

  async getProductImage(id: string) {
    return this.prisma.productImage.findUnique({
      where: {
        id,
      },
    });
  }
}
