import { User } from '@prisma/client';
import { IUser, IUserInProduct } from '../models/user.response';
import { productsInUser } from '../../products/mapper/product.mapper';
import { IUserAndProduct } from '../models/user.interface';

export const usersMapper = (users: IUserAndProduct[]): IUser[] => {
  return users.map((user) => userMapper(user));
};

export const userMapper = (user: IUserAndProduct): IUser => {
  return {
    ...userInProductMapper(user),
    products: user.products ? productsInUser(user.products) : null,
  };
};

export const userInProductMapper = (user: User): IUserInProduct => {
  return {
    id: user.id,
    username: user.username,
    role: user.role,
  };
};
