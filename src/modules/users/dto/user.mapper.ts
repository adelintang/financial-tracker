import { User } from '@prisma/client';
import { IUser } from './user.interface';

export const usersMapper = (users: User[]): IUser[] => {
  return users.map((user) => userMapper(user));
};

export const userMapper = (user: User): IUser => {
  return {
    id: user.id,
    username: user.username,
    role: user.role,
  };
};
