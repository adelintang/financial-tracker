import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../../../common/providers/prisma/prisma.service';
import { RegisterAuthDto } from '../dto/register-auth.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerAuthDto: RegisterAuthDto) {
    return this.prisma.user.create({
      data: {
        id: `user-${uuidv4()}`,
        ...registerAuthDto,
        role: Role.USER,
      },
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async updatePassword(userId: string, newPassword: string) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword,
      },
    });
  }
}
