import { User } from '@prisma/client';
import { IProductWithImage } from '../../products/models/product.interface';

export interface IUserAndProduct extends User {
  products: IProductWithImage[];
}
