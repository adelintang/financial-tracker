import { Category, Transaction, User } from '@prisma/client';

export interface IDetailTransaction extends Transaction {
  user: User;
  category: Category;
}
