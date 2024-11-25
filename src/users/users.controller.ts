import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Utils } from '../utils';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Req() req) {
    console.log(req.user);
    const users = await this.usersService.getUsers();
    return Utils.Response('Success', Utils.MESSAGE.SUCCESS.GET.USERS, users);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.getUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return Utils.Response('Success', Utils.MESSAGE.SUCCESS.GET.USER, user);
  }
}
