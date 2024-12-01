import { Role, User } from '@prisma/client';
import {
  IProductInUser,
  IProductWithImage,
} from '../../products/dto/product.interface';

export interface IUserAndProduct extends User {
  products: IProductWithImage[];
}

export interface IUser extends IUserInProduct {
  products: IProductInUser[] | null;
}

export interface IUserInProduct {
  id: string;
  username: string;
  role: Role;
}
