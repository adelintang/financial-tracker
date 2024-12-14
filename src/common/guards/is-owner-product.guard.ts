import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Const } from '../constans';
import { ProductsRepository } from '../../app/products/repository/products.repository';

@Injectable()
export class IsOwnerProductGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest();
    const product = await this.productsRepository.getProduct(params.productId);
    if (!product) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.PRODUCT);
    }
    return user.userId === product.user_id;
  }
}
