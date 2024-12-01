import { Injectable } from '@nestjs/common';
import { QueryParams } from '../../interfaces';
import { PrismaService } from '../../services/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(query: QueryParams) {
    const { search = '', page = '1', perPage = '10' } = query;
    return this.prisma.user.findMany({
      where: {
        username: {
          contains: search.trim(),
        },
      },
      skip: (Number(page) - 1) * Number(perPage),
      take: Number(perPage),
      include: {
        products: {
          include: {
            productImage: true,
          },
        },
      },
    });
  }

  async getUsersCount(query: QueryParams) {
    const { search = '' } = query;
    return this.prisma.user.count({
      where: {
        username: {
          contains: search.trim(),
        },
      },
    });
  }

  async getUser(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        products: {
          include: {
            productImage: true,
          },
        },
      },
    });
  }
}
