import { Role } from '@prisma/client';

export class IAuthPayload {
  userId: string;
  role: Role;
}

export class QueryParams {
  search?: string;
  page?: string;
  perPage?: string;
}
