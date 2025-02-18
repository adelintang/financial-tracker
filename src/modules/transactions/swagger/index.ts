import { GeneralResponseSwagger } from 'src/common/swagger';
import { TransactionResponse } from '../models/transactions.response';
import { ApiProperty } from '@nestjs/swagger';
import { Const } from 'src/common/constans';

export class CreateTransactionResponseSwagger extends GeneralResponseSwagger<TransactionResponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.CREATED.TRANSACTION })
  message: string;

  @ApiProperty({ type: TransactionResponse })
  data: TransactionResponse;
}
