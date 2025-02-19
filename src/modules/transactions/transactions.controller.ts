import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import {
  CreateTransactionResponseSwagger,
  DeleteTransactionResponseSwagger,
  GetExpenseTransactionResponseSwagger,
  GetIncomeTransactionResponseSwagger,
  UpdateTransactionResponseSwagger,
} from './swagger';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Utils } from '../../common/utils';
import { Const } from '../../common/constans';
import { IAuthPayload, QueryParams } from '../../types';

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

  @Get('/expense')
  @ApiOperation({ summary: 'Endpoint to Get Expense Transactions' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'date', required: false })
  @ApiOkResponse({
    description: 'Successfully get expense transactions',
    type: GetExpenseTransactionResponseSwagger,
  })
  async getExpenseTransactions(
    @Req()
    req: Request & {
      user: IAuthPayload;
      query: QueryParams & { date: string };
    },
  ) {
    const { transactions, meta } =
      await this.transactionsService.getExpenseTransactions(
        req.user.userId,
        req.query,
      );
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.GET.EXPENSE_TRANSACTIONS,
      transactions,
      meta,
    );
  }

  @Get('/income')
  @ApiOperation({ summary: 'Endpoint to Get Income Transactions' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'date', required: false })
  @ApiOkResponse({
    description: 'Successfully get income transactions',
    type: GetIncomeTransactionResponseSwagger,
  })
  async getIncomeTransactions(
    @Req()
    req: Request & {
      user: IAuthPayload;
      query: QueryParams & { date: string };
    },
  ) {
    const { transactions, meta } =
      await this.transactionsService.getIncomeTransactions(
        req.user.userId,
        req.query,
      );
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.GET.INCOME_TRANSACTIONS,
      transactions,
      meta,
    );
  }

  @Get(':transactionId')
  async getTransaction(@Param('transactionId') transactionId: string) {
    const transaction =
      await this.transactionsService.getTransaction(transactionId);
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.GET.TRANSACTION,
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
