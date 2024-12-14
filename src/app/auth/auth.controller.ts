import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response } from 'express';
import { Utils } from '../../common/utils';
import { Const } from '../../common/constans';
import { Throttle } from '@nestjs/throttler';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Endpoint to Registration User' })
  @ApiCreatedResponse({
    description: 'Successfully register user',
    example: Utils.Response('Success', Const.MESSAGE.SUCCESS.AUTH.LOGIN, {
      id: '5c4394f7-d3e3-48d1-8a65-e4324fa7141e',
      username: 'johndoe',
      role: 'SELLER',
    }),
  })
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    const user = await this.authService.register(registerAuthDto);
    return Utils.Response('Success', Const.MESSAGE.SUCCESS.CREATED.USER, user);
  }

  @Post('login')
  @ApiOperation({ summary: 'Endpoint to Login User' })
  @Throttle({ default: { ttl: 900000, limit: 3 } })
  async login(
    @Body() loginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.login(loginAuthDto);
    res.cookie(Const.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return Utils.Response('Success', Const.MESSAGE.SUCCESS.AUTH.LOGIN, {
      accessToken,
    });
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Endpoint to create new access token' })
  refreshToken(@Req() req: Request & { cookies: { refreshToken: string } }) {
    const { refreshToken } = req.cookies;
    const accessToken = this.authService.refreshToken(refreshToken);
    return Utils.Response('Success', Const.MESSAGE.SUCCESS.AUTH.ACCESS_TOKEN, {
      accessToken,
    });
  }

  @Delete('logout')
  @ApiOperation({ summary: 'Endpoint to logout user' })
  logout(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.NO_CONTENT).clearCookie(Const.REFRESH_TOKEN_NAME);
  }
}
