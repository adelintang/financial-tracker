import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../../../common/providers/prisma/prisma.service';
import { RegisterAuthDto } from '../dto/register-auth.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerAuthDto: RegisterAuthDto) {
    return this.prisma.user.create({
      data: { ...registerAuthDto, role: Role.USER },
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
