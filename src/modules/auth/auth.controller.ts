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
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  RegisterAuthResponseSwagger,
  LoginAuthResponseSwagger,
  RefreshTokenResponseSwagger,
  HeaderCookie,
} from './swagger';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Endpoint to Registration User' })
  @ApiCreatedResponse({
    description: 'Successfully register user',
    type: RegisterAuthResponseSwagger,
  })
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    const user = await this.authService.register(registerAuthDto);
    return Utils.Response('Success', Const.MESSAGE.SUCCESS.CREATED.USER, user);
  }

  @Post('login')
  @ApiOperation({ summary: 'Endpoint to Login User' })
  @ApiCreatedResponse({
    description: 'Successfully login',
    type: LoginAuthResponseSwagger,
    headers: HeaderCookie,
  })
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
  @ApiOperation({
    summary: 'Endpoint to create new access token',
    description:
      "This endpoint need cookie `refreshToken`, it's automaticly sending by browser after login.",
  })
  @ApiCreatedResponse({
    description: 'Successfully get new access token',
    type: RefreshTokenResponseSwagger,
  })
  refreshToken(@Req() req: Request & { cookies: { refreshToken: string } }) {
    const { refreshToken } = req.cookies;
    const accessToken = this.authService.refreshToken(refreshToken);
    return Utils.Response('Success', Const.MESSAGE.SUCCESS.AUTH.ACCESS_TOKEN, {
      accessToken,
    });
  }

  @Delete('logout')
  @ApiOperation({
    summary: 'Endpoint to logout user',
    description:
      "This endpoint need cookie `refreshToken`, it's automaticly sending by browser after login.",
  })
  @ApiNoContentResponse({ description: 'No Content' })
  logout(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.NO_CONTENT).clearCookie(Const.REFRESH_TOKEN_NAME);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Endpoint to forgot password' })
  async forgotPassword(@Body() forgotPassword: ForgotPasswordDto) {
    await this.authService.forgotPassword(forgotPassword);
    return Utils.Response('Success', Const.MESSAGE.SUCCESS.CREATED.OTP, null);
  }
}
