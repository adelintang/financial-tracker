import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        desc: createProductDto.desc,
        price: createProductDto.price,
        qty: createProductDto.qty,
      },
    });
  }

  async getProducts() {
    return this.prisma.product.findMany();
  }

  async getProduct(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: {
        id,
      },
      data: { ...updateProductDto },
    });
  }

  async deleteProduct(id: string) {
    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }

  async productAlreadyUsed(name: string) {
    return this.prisma.product.findFirst({
      where: {
        name,
      },
    });
  }
}
