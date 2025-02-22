import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { InvestmentsService } from './investments.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { Utils } from '../../common/utils';
import { Const } from '../../common/constans';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Endpoint to Create Investment' })
  async createInvestment(@Body() createInvestmentDto: CreateInvestmentDto) {
    const investment =
      await this.investmentsService.createInvestment(createInvestmentDto);
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.CREATED.INVESTMENT,
      investment,
    );
  }
}
