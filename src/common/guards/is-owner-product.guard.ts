import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProductsService } from '../../modules/products/products.service';
import { Const } from '../constans';

@Injectable()
export class IsOwnerProductGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private productService: ProductsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest();
    const product = await this.productService.getProduct(params.productId);
    if (!product) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.PRODUCT);
    }
    return user.userId === product.user_id;
  }
}
