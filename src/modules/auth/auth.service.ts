import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { IAuthPayload } from '../../interfaces';
import { Const } from '../../common/constans';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(Const.ACCESS_TOKEN_PROVIDER)
    private readonly accessTokenJwt: JwtService,
    @Inject(Const.REFRESH_TOKEN_PROVIDER)
    private readonly refreshTokenJwt: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    return this.prisma.user.create({
      data: {
        username: registerAuthDto.username,
        password: registerAuthDto.password,
        role: registerAuthDto.role,
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

  // utilities token service
  generateAccessToken(userId: string, role: Role): string {
    return this.accessTokenJwt.sign({ userId, role });
  }

  generateRefreshToken(userId: string, role: Role): string {
    return this.refreshTokenJwt.sign({ userId, role });
  }

  verifyAccessToken(token: string): IAuthPayload | null {
    try {
      return this.accessTokenJwt.verify(token);
    } catch {
      return null;
    }
  }

  verifyRefreshToken(token: string): IAuthPayload | null {
    try {
      return this.refreshTokenJwt.verify(token);
    } catch {
      return null;
    }
  }
}
