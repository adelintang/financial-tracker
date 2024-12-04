import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Const } from '../constans';
import { ProductsImageRepository } from '../../modules/products-image/repository/products-image.repository';
import { ProductsRepository } from '../../modules/products/repository/products.repository';

@Injectable()
export class IsOwnerProductImageGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly productsImageRepository: ProductsImageRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest();
    const productImage = await this.productsImageRepository.getProductImage(
      params.productImageId,
    );
    if (!productImage) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.PRODUCT_IMAGE);
    }
    const product = await this.productsRepository.getProduct(
      productImage.product_id,
    );
    if (!product) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.PRODUCT);
    }
    return user.userId === product.user_id;
  }
}
