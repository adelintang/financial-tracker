import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from './repository/transactions-repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    await this.usersService.getUser(createTransactionDto.userId);
    await this.categoriesService.getCategory(createTransactionDto.categoryId);

    return this.transactionsRepository.createTransaction(createTransactionDto);
  }
}
