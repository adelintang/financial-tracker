import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Const } from '../constans';
import { ProductsImageRepository } from '../../app/products-image/repository/products-image.repository';
import { ProductsRepository } from '../../app/products/repository/products.repository';

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
    if (user.userId !== product.user_id) {
      throw new ForbiddenException(Const.MESSAGE.ERROR.FORBIDDEN.USER);
    }
    return true;
  }
}
