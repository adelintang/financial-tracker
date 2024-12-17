import { PartialType, OmitType } from '@nestjs/swagger';
import { LoginAuthResponse } from './login-auth.response';

export class RefreshTokenResponse extends PartialType(
  OmitType(LoginAuthResponse, ['refreshToken'] as const),
) {}
