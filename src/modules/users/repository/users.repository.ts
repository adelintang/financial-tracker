import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/providers/prisma/prisma.service';
import { QueryParams } from '../../../types';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(query: QueryParams) {
    const { search = '', page = '1', perPage = '10' } = query;
    return this.prisma.user.findMany({
      where: {
        OR: [
          { email: { contains: search.trim() } },
          { name: { contains: search.trim() } },
        ],
      },
      skip: (Number(page) - 1) * Number(perPage),
      take: Number(perPage),
    });
  }

  async getUsersCount(query: QueryParams) {
    const { search = '' } = query;
    return this.prisma.user.count({
      where: {
        OR: [
          { email: { contains: search.trim() } },
          { name: { contains: search.trim() } },
        ],
      },
    });
  }

  async getUser(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
