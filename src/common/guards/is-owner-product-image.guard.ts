import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProductsImageService } from '../../modules/products-image/products-image.service';
import { ProductsService } from 'src/modules/products/products.service';
import { Const } from '../constans';

@Injectable()
export class IsOwnerProductImage implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly productImageService: ProductsImageService,
    private readonly productService: ProductsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest();
    const productImage = await this.productImageService.getProductImage(
      params.productImageId,
    );
    if (!productImage) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.PRODUCT_IMAGE);
    }
    const product = await this.productService.getProduct(
      productImage.product_id,
    );
    if (!product) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.PRODUCT);
    }
    return user.userId === product.user_id;
  }
}
