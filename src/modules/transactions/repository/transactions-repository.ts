import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../../../common/providers/prisma/prisma.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { QueryParams } from '../../../types';
import { TransactionType } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        id: `transaction-${uuidv4()}`,
        ...createTransactionDto,
      },
    });
  }

  async getTransactionsExpense(query: QueryParams & { date: string }) {
    const { search = '', page = '1', perPage = '10', date } = query;

    return this.prisma.transaction.findMany({
      where: {
        type: TransactionType.EXPENSE,
        description: {
          contains: search.trim(),
        },
        createdAt: date,
      },
      skip: (Number(page) - 1) * Number(perPage),
      take: Number(perPage),
    });
  }
  async getTransactionsExpenseCount(query: QueryParams & { date: string }) {
    const { search = '', date } = query;

    return this.prisma.transaction.count({
      where: {
        type: TransactionType.EXPENSE,
        description: {
          contains: search.trim(),
        },
        createdAt: date,
      },
    });
  }

  async getTransactionsIncome(query: QueryParams & { date: string }) {
    const { search = '', page = '1', perPage = '10', date } = query;

    return this.prisma.transaction.findMany({
      where: {
        type: TransactionType.INCOME,
        description: {
          contains: search.trim(),
        },
        createdAt: date,
      },
      skip: (Number(page) - 1) * Number(perPage),
      take: Number(perPage),
    });
  }

  async getTransactionsIncomeCount(query: QueryParams & { date: string }) {
    const { search = '', date } = query;

    return this.prisma.transaction.count({
      where: {
        type: TransactionType.INCOME,
        description: {
          contains: search.trim(),
        },
        createdAt: date,
      },
    });
  }

  async getTransaction(transactionId: string) {
    return this.prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });
  }

  async updateTransaction(
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        ...updateTransactionDto,
      },
    });
  }

  async deleteTransaction(transactionId: string) {
    return this.prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });
  }
}
