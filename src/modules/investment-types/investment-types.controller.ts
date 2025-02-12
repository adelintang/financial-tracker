import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';
import { InvestmentTypesService } from './investment-types.service';
import { CreateInvestmentTypeDto } from './dto/create-investment-type.dto';
import { Const } from '../../common/constans';
import { Utils } from '../../common/utils';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { QueryParams } from '../../types';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('investment-types')
export class InvestmentTypesController {
  constructor(
    private readonly investmentTypesService: InvestmentTypesService,
  ) {}

  @Post()
  @Roles('ADMIN')
  async createInvestmentType(
    @Body() createInvestmentTypeDto: CreateInvestmentTypeDto,
  ) {
    const investmentType =
      await this.investmentTypesService.createInvestmentType(
        createInvestmentTypeDto,
      );
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.CREATED.INVESTMENT_TYPE,
      investmentType,
    );
  }

  @Get()
  @ApiQuery({ name: 'search', required: false })
  async getInvestmentTypes(@Req() req: Request & { query: QueryParams }) {
    const investmentTypes =
      await this.investmentTypesService.getInvestmentTypes(req.query);
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.GET.INVESTMENT_TYPES,
      investmentTypes,
    );
  }
}
