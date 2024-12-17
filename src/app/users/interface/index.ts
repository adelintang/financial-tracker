import { User } from '@prisma/client';
import { IProductWithImage } from '../../products/interface';

export interface IUserAndProduct extends User {
  products: IProductWithImage[];
}
