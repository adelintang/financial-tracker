import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { Request } from 'express';
import { InvestmentTypesService } from './investment-types.service';
import { CreateInvestmentTypeDto } from './dto/create-investment-type.dto';
import { Const } from '../../common/constans';
import { Utils } from '../../common/utils';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { QueryParams } from '../../types';
import {
  CreateInvestmentTypeResponseSwagger,
  InvestmentTypesResponseSwagger,
} from './swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('investment-types')
export class InvestmentTypesController {
  constructor(
    private readonly investmentTypesService: InvestmentTypesService,
  ) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Endpoint to Create Investment Type' })
  @ApiCreatedResponse({
    description: 'Successfully created category investment type',
    type: CreateInvestmentTypeResponseSwagger,
  })
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
  @ApiOperation({ summary: 'Endpoint to Get Investment Types' })
  @ApiOkResponse({
    description: 'Successfully fetched category investment types',
    type: InvestmentTypesResponseSwagger,
  })
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
