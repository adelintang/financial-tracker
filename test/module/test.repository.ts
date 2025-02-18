import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../src/common/providers/prisma/prisma.service';

@Injectable()
export class TestRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async deleteManyUser(namePrefix: string) {
    return this.prisma.user.deleteMany({
      where: {
        name: {
          startsWith: namePrefix.trim(),
        },
      },
    });
  }

  async registerMany(users: User[]) {
    return this.prisma.user.createMany({
      data: users,
      skipDuplicates: true,
    });
  }

  async deleteCategory(id: number) {
    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
