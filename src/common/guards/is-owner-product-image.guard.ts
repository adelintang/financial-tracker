import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Const } from '../constans';
import { ProductsImageRepository } from 'src/modules/products-image/repository/products-image.repository';
import { ProductsRepository } from 'src/modules/products/repository/products.repository';

@Injectable()
export class IsOwnerProductImageGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly productImageRepository: ProductsImageRepository,
    private readonly productRepository: ProductsRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest();
    const productImage = await this.productImageRepository.getProductImage(
      params.productImageId,
    );
    if (!productImage) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.PRODUCT_IMAGE);
    }
    const product = await this.productRepository.getProduct(
      productImage.product_id,
    );
    if (!product) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.PRODUCT);
    }
    return user.userId === product.user_id;
  }
}
