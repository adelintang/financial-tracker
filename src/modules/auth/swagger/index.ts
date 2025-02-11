import { ApiProperty } from '@nestjs/swagger';
import { Const } from '../../../common/constans';
import { GeneralResponseSwagger } from '../../../common/swagger';
import {
  RegisterAuthResponse,
  LoginAuthResponse,
  RefreshTokenResponse,
} from '../models/auth.response';
import { HeadersObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export class RegisterAuthResponseSwagger extends GeneralResponseSwagger<RegisterAuthResponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.CREATED.USER })
  message: string;

  @ApiProperty({ type: RegisterAuthResponse })
  data: RegisterAuthResponse;
}

export class LoginAuthResponseSwagger extends GeneralResponseSwagger<LoginAuthResponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.AUTH.LOGIN })
  message: string;

  @ApiProperty({ type: LoginAuthResponse })
  data: LoginAuthResponse;
}

export class RefreshTokenResponseSwagger extends GeneralResponseSwagger<RefreshTokenResponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.AUTH.ACCESS_TOKEN })
  message: string;

  @ApiProperty({ type: RefreshTokenResponse })
  data: RefreshTokenResponse;
}

export const HeaderCookie: HeadersObject = {
  'Set-Cookie': {
    description: 'Refresh token for Cookie',
    schema: {
      type: 'string',
      example:
        'refreshToken=eyJhbGciOiJIUzI1NiIsInR...; HttpOnly; Path=/; Max-Age=3600',
    },
  },
};

export class ForgotPasswordResponseSwagger extends GeneralResponseSwagger<any> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.CREATED.OTP })
  message: string;

  @ApiProperty({ example: null })
  data: any;
}
