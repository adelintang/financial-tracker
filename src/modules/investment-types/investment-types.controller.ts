import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InvestmentTypesService } from './investment-types.service';
import { CreateInvestmentTypeDto } from './dto/create-investment-type.dto';
import { Const } from '../../common/constans';
import { Utils } from '../../common/utils';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

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
}
