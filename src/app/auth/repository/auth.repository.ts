import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/providers/prisma.service';
import { RegisterAuthDto } from '../dto/register-auth.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerAuthDto: RegisterAuthDto) {
    return this.prisma.user.create({
      data: {
        username: registerAuthDto.username,
        password: registerAuthDto.password,
        role: registerAuthDto.role,
      },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });
  }

  async getUserByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
}
