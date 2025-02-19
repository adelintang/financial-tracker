import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TransactionsRepository } from '../../modules/transactions/repository/transactions-repository';
import { Const } from '../constans';

@Injectable()
export class TransactionOwner implements CanActivate {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest();
    const transaction = await this.transactionsRepository.getTransaction(
      params.transactionId,
    );
    if (!transaction) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.TRANSACTION);
    }
    if (user.userId !== transaction.userId) {
      throw new ForbiddenException(Const.MESSAGE.ERROR.FORBIDDEN.USER);
    }
    return true;
  }
}
