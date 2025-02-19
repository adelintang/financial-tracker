import { Transaction } from '@prisma/client';
import {
  DetailTransactionResponse,
  TransactionResponse,
} from '../models/transactions.response';
import { IDetailTransaction } from '../models/transactions.interface';
import { userMapper } from '../../../modules/users/mapper/user.mapper';
import { categoryMapper } from '../../../modules/categories/mapper/categories.mapper';

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

export const transactionsMapper = (
  transactions: Transaction[],
): TransactionResponse[] => {
  return transactions.map((transaction) =>
    transactionMutationMapper(transaction),
  );
};

export const transactionMapper = (
  transaction: IDetailTransaction,
): DetailTransactionResponse => {
  return {
    id: transaction.id,
    type: transaction.type,
    amount: transaction.amount,
    description: transaction.description,
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt,
    user: userMapper(transaction.user),
    category: categoryMapper(transaction.category),
  };
};
