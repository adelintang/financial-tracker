import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryParams } from '../../types';
import { UsersRepository } from './repository/users.repository';
import { Utils } from '../../common/utils';
import { userMapper, usersMapper } from './mapper/user.mapper';
import { Const } from '../../common/constans';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUsers(query: QueryParams) {
    const { page = '1', perPage = '10' } = query;
    const [users, totalData] = await Promise.all([
      this.usersRepository.getUsers(query),
      this.usersRepository.getUsersCount(query),
    ]);
    const meta = Utils.MetaPagination(
      Number(page),
      Number(perPage),
      users.length,
      totalData,
    );
    return { users: usersMapper(users), meta };
  }

  async getUser(id: string) {
    const user = await this.usersRepository.getUser(id);
    if (!user) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.USER);
    }
    return userMapper(user);
  }
}
