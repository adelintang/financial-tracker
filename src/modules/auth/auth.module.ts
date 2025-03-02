import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategyService } from '../../common/providers/jwt-strategy.service';
import { AuthRepository } from './repository/auth.repository';
import {
  AccessTokenService,
  RefreshTokenService,
} from '../../common/providers/token.service';
import { PrismaModule } from '../../common/providers/prisma/prisma.module';
import { MailModule } from '../../common/providers/mail/mail.module';
import { OtpRepository } from './repository/otp.repository';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    OtpRepository,
    JwtStrategyService,
    AccessTokenService,
    RefreshTokenService,
  ],
  imports: [
    // Register JwtModule without directly injecting a global secret
    JwtModule.register({}),
    PassportModule,
    PrismaModule,
    MailModule,
  ],
})
export class AuthModule {}
