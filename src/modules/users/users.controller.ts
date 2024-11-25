import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Utils } from '../../utils';
import { QueryParams } from '../../interfaces';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
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
      Utils.MESSAGE.SUCCESS.GET.USERS,
      users,
      meta,
    );
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.getUser(id);
    if (!user) {
      throw new NotFoundException(Utils.MESSAGE.ERROR.NOT_FOUND.USER);
    }
    return Utils.Response('Success', Utils.MESSAGE.SUCCESS.GET.USER, user);
  }
}
