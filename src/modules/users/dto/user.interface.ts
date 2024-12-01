import { Role } from '@prisma/client';

export interface IUser {
  id: string;
  username: string;
  role: Role;
}
