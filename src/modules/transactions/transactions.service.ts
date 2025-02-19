import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from './repository/transactions-repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';
import { TransactionResponse } from './models/transactions.response';
import {
  transactionMutationMapper,
  transactionsMapper,
} from './mapper/transactions.mapper';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Const } from '../../common/constans';
import { QueryParams } from '../../types';
import { Utils } from '../../common/utils';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionResponse> {
    await this.usersService.getUser(createTransactionDto.userId);
    await this.categoriesService.getCategory(createTransactionDto.categoryId);

    const createTransaction =
      await this.transactionsRepository.createTransaction(createTransactionDto);
    return transactionMutationMapper(createTransaction);
  }

  async getExpenseTransactions(
    userId: string,
    query: QueryParams & { date: string },
  ) {
    const { page = '1', perPage = '10' } = query;
    const [transactions, totalData] = await Promise.all([
      this.transactionsRepository.getExpenseTransactions(userId, query),
      this.transactionsRepository.getExpenseTransactionsCount(userId, query),
    ]);
    const meta = Utils.MetaPagination(
      Number(page),
      Number(perPage),
      transactions.length,
      totalData,
    );
    return { transactions: transactionsMapper(transactions), meta };
  }

  async getIncomeTransactions(
    userId: string,
    query: QueryParams & { date: string },
  ) {
    const { page = '1', perPage = '10' } = query;
    const [transactions, totalData] = await Promise.all([
      this.transactionsRepository.getIncomeTransactions(userId, query),
      this.transactionsRepository.getIncomeTransactionsCount(userId, query),
    ]);
    const meta = Utils.MetaPagination(
      Number(page),
      Number(perPage),
      transactions.length,
      totalData,
    );
    return { transactions: transactionsMapper(transactions), meta };
  }

  async updateTransaction(
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<TransactionResponse> {
    const transaction =
      await this.transactionsRepository.getTransaction(transactionId);
    if (!transaction) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.TRANSACTION);
    }
    const updatedTransaction =
      await this.transactionsRepository.updateTransaction(
        transactionId,
        updateTransactionDto,
      );
    return transactionMutationMapper(updatedTransaction);
  }

  async deleteTransaction(transactionId: string): Promise<TransactionResponse> {
    const transaction =
      await this.transactionsRepository.getTransaction(transactionId);
    if (!transaction) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.TRANSACTION);
    }
    const deletedTransaction =
      await this.transactionsRepository.deleteTransaction(transactionId);
    return transactionMutationMapper(deletedTransaction);
  }
}
