import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { Const } from '../../common/constans';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: Const.ACCESS_TOKEN_PROVIDER,
      useFactory() {
        return new JwtService({
          secret: process.env.SECRET_ACCESS_TOKEN,
          signOptions: { expiresIn: '1d' },
        });
      },
    },
    {
      provide: Const.REFRESH_TOKEN_PROVIDER,
      useFactory() {
        return new JwtService({
          secret: process.env.SECRET_REFRESH_TOKEN,
          signOptions: { expiresIn: '7d' },
        });
      },
    },
  ],
  imports: [
    PrismaModule,
    // Register JwtModule without directly injecting a global secret
    JwtModule.register({}),
    PassportModule,
  ],
})
export class AuthModule {}
