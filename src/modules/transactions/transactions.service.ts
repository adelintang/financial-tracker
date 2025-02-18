import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from './repository/transactions-repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';
import { TransactionResponse } from './models/transactions.response';
import { transactionMutationMapper } from './mapper/transactions.mapper';

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
}
