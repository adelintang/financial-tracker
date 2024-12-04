import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Utils } from '../../common/utils';
import { QueryParams } from '../../interfaces';
import { Const } from '../../common/constans';
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
    const { users, meta } = await this.usersService.getUsers(req.query);
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.GET.USERS,
      users,
      meta,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Endpoint for get user by id' })
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.getUser(id);
    return Utils.Response('Success', Const.MESSAGE.SUCCESS.GET.USER, user);
  }
}
