import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/common/providers/prisma.service';

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
}
