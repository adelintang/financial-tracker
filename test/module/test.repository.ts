import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/common/providers/prisma.service';
import { RegisterAuthDto } from '../../src/modules/auth/dto/register-auth.dto';

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

  async deleteManyUser(usernamePrefix: string) {
    return this.prisma.user.deleteMany({
      where: {
        username: {
          startsWith: usernamePrefix.trim(),
        },
      },
    });
  }

  async registerMany(users: RegisterAuthDto[]) {
    return this.prisma.user.createMany({
      data: users,
      skipDuplicates: true,
    });
  }
}
