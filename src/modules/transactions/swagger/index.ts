import { ApiProperty } from '@nestjs/swagger';
import {
  DetailTransactionResponse,
  IncomeTransactionResponse,
  TransactionResponse,
} from '../models/transactions.response';
import { GeneralResponseSwagger, MetaSwagger } from '../../../common/swagger';
import { Const } from '../../../common/constans';

export class CreateTransactionResponseSwagger extends GeneralResponseSwagger<TransactionResponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.CREATED.TRANSACTION })
  message: string;

  @ApiProperty({ type: TransactionResponse })
  data: TransactionResponse;
}

export class UpdateTransactionResponseSwagger extends CreateTransactionResponseSwagger {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.UPDATED.TRANSACTION })
  message: string;
}

export class DeleteTransactionResponseSwagger extends CreateTransactionResponseSwagger {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.DELETED.TRANSACTION })
  message: string;
}

export class GetExpenseTransactionsResponseSwagger extends GeneralResponseSwagger<
  TransactionResponse[],
  MetaSwagger
> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.GET.EXPENSE_TRANSACTIONS })
  message: string;

  @ApiProperty({ type: [TransactionResponse] })
  data: TransactionResponse[];

  @ApiProperty({ type: MetaSwagger })
  meta?: MetaSwagger;
}

export class GetIncomeTransactionsResponseSwagger extends GeneralResponseSwagger<
  IncomeTransactionResponse[],
  MetaSwagger
> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.GET.INCOME_TRANSACTIONS })
  message: string;

  @ApiProperty({ type: [IncomeTransactionResponse] })
  data: IncomeTransactionResponse[];

  @ApiProperty({ type: MetaSwagger })
  meta?: MetaSwagger;
}

export class GetTransactionResponseSwagger extends GeneralResponseSwagger<DetailTransactionResponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.GET.TRANSACTION })
  message: string;

  @ApiProperty({ type: DetailTransactionResponse })
  data: DetailTransactionResponse;
}
