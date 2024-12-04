import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryParams } from '../../interfaces';
import { ProductsRepository } from './repository/products.repository';
import { UsersService } from '../users/users.service';
import { Utils } from '../../common/utils';
import { productMapper, productsMapper } from './dto/product.mapper';
import { Const } from '../../common/constans';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly usersService: UsersService,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    await this.usersService.getUser(createProductDto.user_id);
    const product =
      await this.productsRepository.createProduct(createProductDto);
    return product;
  }

  async getProducts(query: QueryParams) {
    const { page = '1', perPage = '10' } = query;
    const [products, totalData] = await Promise.all([
      this.productsRepository.getProducts(query),
      this.productsRepository.getProductsCount(query),
    ]);
    const meta = Utils.MetaPagination(
      Number(page),
      Number(perPage),
      products.length,
      totalData,
    );
    return { products: productsMapper(products), meta };
  }

  async getProduct(productId: string) {
    const product = await this.productsRepository.getProduct(productId);
    if (!product) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.PRODUCT);
    }
    return productMapper(product);
  }

  async updateProduct(productId: string, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.getProduct(productId);
    if (!product) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.PRODUCT);
    }
    const updatedProduct = await this.productsRepository.updateProduct(
      productId,
      updateProductDto,
    );
    return updatedProduct;
  }

  async deleteProduct(productId: string) {
    const product = await this.productsRepository.getProduct(productId);
    if (!product) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.PRODUCT);
    }
    const deletedProduct =
      await this.productsRepository.deleteProduct(productId);
    return deletedProduct;
  }
}
