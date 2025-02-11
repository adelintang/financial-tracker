import { User } from '@prisma/client';
import { IUser } from '../models/user.interface';

export const usersMapper = (users: User[]): IUser[] => {
  return users.map((user) => userMapper(user));
};

export const userMapper = (user: User): IUser => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    currency: user.currency,
  };
};
