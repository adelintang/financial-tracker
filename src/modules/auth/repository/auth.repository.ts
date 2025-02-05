import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/providers/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerAuthDto: any) {
    return this.prisma.user.create(registerAuthDto);
  }

  async getUserByUsername(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
