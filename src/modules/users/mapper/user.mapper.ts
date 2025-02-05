import { User } from '@prisma/client';

export const usersMapper = (users) => {
  return users.map((user) => userMapper(user));
};

export const userMapper = (user) => {};
