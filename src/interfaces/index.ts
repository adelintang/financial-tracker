import { Role } from '@prisma/client';

export interface IAuthPayload {
  userId: string;
  role: Role;
}

export interface QueryParams {
  search?: string;
  page?: string;
  perPage?: string;
}
