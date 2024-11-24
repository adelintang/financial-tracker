import { Role } from '@prisma/client';

export interface IAuthPayload {
  userId: string;
  role: Role;
}
