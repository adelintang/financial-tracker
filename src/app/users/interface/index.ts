import { User } from '@prisma/client';
import { IProductWithImage } from '../../products/dto/product.interface';

export interface IUserAndProduct extends User {
  products: IProductWithImage[];
}
