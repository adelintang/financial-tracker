import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { IAuthPayload } from '../../types';
import { Const } from '../../common/constans';
import { AuthRepository } from './repository/auth.repository';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthResponse, LoginAuthResponse } from './dto/auth.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    @Inject(Const.ACCESS_TOKEN_PROVIDER)
    private readonly accessTokenJwt: JwtService,
    @Inject(Const.REFRESH_TOKEN_PROVIDER)
    private readonly refreshTokenJwt: JwtService,
  ) {}

  async register(
    registerAuthDto: RegisterAuthDto,
  ): Promise<RegisterAuthResponse> {
    const duplicateUsername = await this.authRepository.getUserByUsername(
      registerAuthDto.username,
    );
    if (duplicateUsername) {
      throw new BadRequestException(Const.MESSAGE.ERROR.BAD_REQUEST.USERNAME);
    }
    const passwordHash = await bcrypt.hash(registerAuthDto.password, 10);
    const user: RegisterAuthDto = {
      ...registerAuthDto,
      password: passwordHash,
    };
    return await this.authRepository.register(user);
  }

  async login(loginAuthDto: LoginAuthDto): Promise<LoginAuthResponse> {
    const user = await this.authRepository.getUserByUsername(
      loginAuthDto.username,
    );
    if (!user) {
      throw new BadRequestException(
        Const.MESSAGE.ERROR.BAD_REQUEST.INVALID_CREDENTIALS,
      );
    }
    const isMatchPassword = await bcrypt.compare(
      loginAuthDto.password,
      user.password,
    );
    if (!isMatchPassword) {
      throw new BadRequestException(
        Const.MESSAGE.ERROR.BAD_REQUEST.INVALID_CREDENTIALS,
      );
    }
    const accessToken = this.generateAccessToken(user.id, user.role);
    const refreshToken = this.generateRefreshToken(user.id, user.role);
    return { accessToken, refreshToken };
  }

  refreshToken(refreshToken: string): string {
    if (!refreshToken) {
      throw new UnauthorizedException(Const.MESSAGE.ERROR.AUTH.NO_TOKEN);
    }
    const decoded = this.verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new UnauthorizedException(Const.MESSAGE.ERROR.AUTH.INVALID_TOKEN);
    }
    const accessToken = this.generateAccessToken(decoded.userId, decoded.role);
    return accessToken;
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
