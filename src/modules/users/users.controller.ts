import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Utils } from '../../common/utils';
import { QueryParams } from '../../interfaces';
import { Const } from '../../common/constans';
import { userMapper, usersMapper } from './dto/user.mapper';
import { IUserAndProduct } from './dto/user.interface';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Endpoint for get all user' })
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'search', required: false })
  async getUsers(@Req() req: Request & { query: QueryParams }) {
    const { query } = req;
    const { page = '1', perPage = '10' } = query;
    console.log(req.user);
    const [users, totalData] = await Promise.all([
      this.usersService.getUsers(query),
      this.usersService.getUsersCount(query),
    ]);
    const meta = Utils.MetaPagination(
      Number(page),
      Number(perPage),
      users.length,
      totalData,
    );
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.GET.USERS,
      usersMapper(users as IUserAndProduct[]),
      meta,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Endpoint for get user by id' })
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.getUser(id);
    if (!user) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.USER);
    }
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.GET.USER,
      userMapper(user as IUserAndProduct),
    );
  }
}
