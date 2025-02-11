import { Currency } from '@prisma/client';

export interface IUser {
  id: string;
  email: string;
  name: string;
  currency: Currency;
}
