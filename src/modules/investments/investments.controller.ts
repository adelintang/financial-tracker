import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { InvestmentsService } from './investments.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { Utils } from '../../common/utils';
import { Const } from '../../common/constans';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { IAuthPayload } from '../../types';
import {
  CreateInvestmentResponseSwagger,
  GetInvestmentResponseSwagger,
} from './swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Endpoint to Create Investment' })
  @ApiCreatedResponse({
    description: 'Successfully created investment',
    type: CreateInvestmentResponseSwagger,
  })
  async createInvestment(@Body() createInvestmentDto: CreateInvestmentDto) {
    const investment =
      await this.investmentsService.createInvestment(createInvestmentDto);
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.CREATED.INVESTMENT,
      investment,
    );
  }

  @Get(':investmentId')
  @ApiOperation({ summary: 'Endpoint to Get Investment' })
  @ApiOkResponse({
    description: 'Successfully get investment',
    type: GetInvestmentResponseSwagger,
  })
  async getInvestment(
    @Req() req: Request & { user: IAuthPayload },
    @Param('investmentId') investmentId: string,
  ) {
    const investment = await this.investmentsService.getInvestment(
      req.user.userId,
      investmentId,
    );
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.GET.INVESTMENT,
      investment,
    );
  }
}
