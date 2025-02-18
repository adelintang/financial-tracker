import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from './repository/transactions-repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';
import { TransactionResponse } from './models/transactions.response';
import { transactionMutationMapper } from './mapper/transactions.mapper';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Const } from '../../common/constans';

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
