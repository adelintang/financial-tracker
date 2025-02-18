import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import {
  CreateTransactionResponseSwagger,
  DeleteTransactionResponseSwagger,
  UpdateTransactionResponseSwagger,
} from './swagger';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Utils } from '../../common/utils';
import { Const } from '../../common/constans';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Endpoint to Create Transaction' })
  @ApiCreatedResponse({
    description: 'Successfully created transaction',
    type: CreateTransactionResponseSwagger,
  })
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    const transaction =
      await this.transactionsService.createTransaction(createTransactionDto);
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.CREATED.TRANSACTION,
      transaction,
    );
  }

  @Patch(':transactionId')
  @ApiOperation({ summary: 'Endpoint to Update Transaction' })
  @ApiOkResponse({
    description: 'Successfully update transaction',
    type: UpdateTransactionResponseSwagger,
  })
  async updateTransaction(
    @Param('transactionId') transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    const transaction = await this.transactionsService.updateTransaction(
      transactionId,
      updateTransactionDto,
    );
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.UPDATED.TRANSACTION,
      transaction,
    );
  }

  @Delete(':transactionId')
  @ApiOperation({ summary: 'Endpoint to Delete Transaction' })
  @ApiOkResponse({
    description: 'Successfully delete transaction',
    type: DeleteTransactionResponseSwagger,
  })
  async deleteTransaction(@Param('transactionId') transactionId: string) {
    const transaction =
      await this.transactionsService.deleteTransaction(transactionId);
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.DELETED.TRANSACTION,
      transaction,
    );
  }
}
