import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { QueryParams } from '../../interfaces';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        desc: createProductDto.desc,
        price: createProductDto.price,
        qty: createProductDto.qty,
        user_id: createProductDto.user_id,
      },
    });
  }

  async getProducts(query: QueryParams) {
    const { search = '', page = '1', perPage = '10' } = query;
    return this.prisma.product.findMany({
      where: {
        name: {
          contains: search.trim(),
        },
      },
      skip: (Number(page) - 1) * Number(perPage),
      take: Number(perPage),
      include: {
        user: true,
        productImage: true,
      },
    });
  }

  async getProductsCount(query: QueryParams) {
    const { search = '' } = query;
    return this.prisma.product.count({
      where: {
        name: {
          contains: search.trim(),
        },
      },
    });
  }

  async getProduct(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        productImage: true,
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
