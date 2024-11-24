import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Constants } from './constants';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    const duplicateUsername = await this.authService.getUserByUsername(
      registerAuthDto.username,
    );
    if (duplicateUsername) {
      throw new BadRequestException('Username already used');
    }
    const passwordHash = await bcrypt.hash(registerAuthDto.password, 10);
    const user: RegisterAuthDto = {
      ...registerAuthDto,
      password: passwordHash,
    };
    return this.authService.register(user);
  }

  @Post('login')
  async login(
    @Body() loginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.getUserByUsername(
      loginAuthDto.username,
    );
    if (!user) {
      throw new BadRequestException('Username or password wrong');
    }
    const isMatchPassword = await bcrypt.compare(
      loginAuthDto.password,
      user.password,
    );
    if (!isMatchPassword) {
      throw new BadRequestException('Username or password wrong');
    }
    const accessToken = this.authService.generateAccessToken(
      user.id,
      user.role,
    );
    const refreshToken = this.authService.generateRefreshToken(
      user.id,
      user.role,
    );
    res.cookie(Constants.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return {
      accessToken,
    };
  }

  @Post('refresh-token')
  refreshToken(@Req() req: Request & { cookies: { refreshToken: string } }) {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new UnauthorizedException('Token not provided');
    }
    const decoded = this.authService.verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new UnauthorizedException('Invalid token');
    }
    const accessToken = this.authService.generateAccessToken(
      decoded.userId,
      decoded.role,
    );
    return { accessToken };
  }

  @Delete('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.NO_CONTENT).clearCookie(Constants.REFRESH_TOKEN_NAME);
  }
}
