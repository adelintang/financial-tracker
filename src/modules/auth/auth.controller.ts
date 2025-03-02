import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
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
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  RegisterAuthResponseSwagger,
  LoginAuthResponseSwagger,
  RefreshTokenResponseSwagger,
  HeaderCookie,
  ForgotPasswordResponseSwagger,
  VerifyOtpResponseSwagger,
  UpdatePasswordResponseSwagger,
} from './swagger';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

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
  @HttpCode(200)
  @ApiOperation({ summary: 'Endpoint to Login User' })
  @ApiOkResponse({
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
  @HttpCode(200)
  @ApiOperation({
    summary: 'Endpoint to create new access token',
    description:
      "This endpoint need cookie `refreshToken`, it's automaticly sending by browser after login.",
  })
  @ApiOkResponse({
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
  @HttpCode(200)
  @ApiOperation({ summary: 'Endpoint to forgot password' })
  @ApiOkResponse({
    description: 'Successfully forgot password',
    type: ForgotPasswordResponseSwagger,
  })
  async forgotPassword(@Body() forgotPassword: ForgotPasswordDto) {
    await this.authService.forgotPassword(forgotPassword);
    return Utils.Response('Success', Const.MESSAGE.SUCCESS.CREATED.OTP, null);
  }

  @Post('verify-otp')
  @HttpCode(200)
  @ApiOperation({ summary: 'Endpoint to verify otp' })
  @ApiOkResponse({
    description: 'Successfully verify otp',
    type: VerifyOtpResponseSwagger,
  })
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    await this.authService.verifyOtp(verifyOtpDto);
    return Utils.Response('Success', Const.MESSAGE.SUCCESS.GET.OTP, null);
  }

  @Patch('update-password')
  @ApiOperation({ summary: 'Endpoint to update password' })
  @ApiOkResponse({
    description: 'Successfully update password',
    type: UpdatePasswordResponseSwagger,
  })
  async updatePassword(@Body() updatePasswordDto: LoginAuthDto) {
    await this.authService.updatePassword(updatePasswordDto);
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.UPDATED.PASSWORD,
      null,
    );
  }
}
