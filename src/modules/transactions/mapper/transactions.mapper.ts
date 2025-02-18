import { Transaction } from '@prisma/client';
import { TransactionResponse } from '../models/transactions.response';

export const transactionMutationMapper = (
  transaction: Transaction,
): TransactionResponse => {
  return {
    id: transaction.id,
    type: transaction.type,
    amount: transaction.amount,
    description: transaction.description,
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt,
  };
};
