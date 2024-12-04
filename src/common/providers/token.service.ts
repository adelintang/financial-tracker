import { Provider } from '@nestjs/common';
import { Const } from '../constans';
import { JwtService } from '@nestjs/jwt';

export const AccessTokenService: Provider = {
  provide: Const.ACCESS_TOKEN_PROVIDER,
  useFactory() {
    return new JwtService({
      secret: process.env.SECRET_ACCESS_TOKEN,
      signOptions: { expiresIn: '1d' },
    });
  },
};

export const RefreshTokenService: Provider = {
  provide: Const.REFRESH_TOKEN_PROVIDER,
  useFactory() {
    return new JwtService({
      secret: process.env.SECRET_REFRESH_TOKEN,
      signOptions: { expiresIn: '7d' },
    });
  },
};
