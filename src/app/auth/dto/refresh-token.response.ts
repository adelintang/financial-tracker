import { PartialType, OmitType } from '@nestjs/swagger';
import { LoginAuthResponse } from './login-auth.response';
import { GeneralResponse } from 'src/types';
import { ApiProperty } from '@nestjs/swagger';
import { Const } from '../../../common/constans';

class RefreshTokenResponse extends PartialType(
  OmitType(LoginAuthResponse, ['refreshToken'] as const),
) {}

export class RefreshTokenResponseSwagger
  implements GeneralResponse<RefreshTokenResponse>
{
  @ApiProperty({ example: 'Success' })
  status: 'Success' | 'Error';

  @ApiProperty({ example: Const.MESSAGE.SUCCESS.AUTH.ACCESS_TOKEN })
  message: string;

  @ApiProperty({ type: RefreshTokenResponse })
  data: RefreshTokenResponse;
}
