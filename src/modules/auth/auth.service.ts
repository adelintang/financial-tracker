import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { IAuthPayload } from '../../types';
import { Const } from '../../common/constans';
import { AuthRepository } from './repository/auth.repository';
import { LoginAuthDto } from './dto/login-auth.dto';
import {
  RegisterAuthResponse,
  LoginAuthResponse,
} from './models/auth.response';
import { MailService } from '../../common/providers/mail/mail.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { Utils } from '../../common/utils';
import { OtpRepository } from './repository/otp.repository';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { userMapper } from '../users/mapper/user.mapper';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    @Inject(Const.ACCESS_TOKEN_PROVIDER)
    private readonly accessTokenJwt: JwtService,
    @Inject(Const.REFRESH_TOKEN_PROVIDER)
    private readonly refreshTokenJwt: JwtService,
    private readonly mailService: MailService,
    private readonly otpRepository: OtpRepository,
  ) {}

  async register(
    registerAuthDto: RegisterAuthDto,
  ): Promise<RegisterAuthResponse> {
    const duplicateEmail = await this.authRepository.getUserByEmail(
      registerAuthDto.email,
    );
    if (duplicateEmail) {
      throw new BadRequestException(Const.MESSAGE.ERROR.BAD_REQUEST.EMAIL);
    }
    const passwordHash = await bcrypt.hash(registerAuthDto.password, 10);
    const user: RegisterAuthDto = {
      ...registerAuthDto,
      password: passwordHash,
    };
    const result = await this.authRepository.register(user);
    return userMapper(result);
  }

  async login(loginAuthDto: LoginAuthDto): Promise<LoginAuthResponse> {
    const user = await this.authRepository.getUserByEmail(loginAuthDto.email);
    if (!user) {
      throw new BadRequestException(
        Const.MESSAGE.ERROR.BAD_REQUEST.INVALID_CREDENTIALS,
      );
    }
    const isMatchPassword = await bcrypt.compare(
      loginAuthDto.password,
      user.password,
    );
    if (!isMatchPassword) {
      throw new BadRequestException(
        Const.MESSAGE.ERROR.BAD_REQUEST.INVALID_CREDENTIALS,
      );
    }
    const accessToken = this.generateAccessToken(user.id, user.role);
    const refreshToken = this.generateRefreshToken(user.id, user.role);
    return { accessToken, refreshToken };
  }

  refreshToken(refreshToken: string): string {
    if (!refreshToken) {
      throw new UnauthorizedException(Const.MESSAGE.ERROR.AUTH.NO_TOKEN);
    }
    const decoded = this.verifyRefreshToken(refreshToken) as IAuthPayload;
    if (decoded instanceof TokenExpiredError) {
      throw new UnauthorizedException(Const.MESSAGE.ERROR.AUTH.EXPIRED_TOKEN);
    } else if (decoded instanceof JsonWebTokenError) {
      throw new UnauthorizedException(Const.MESSAGE.ERROR.AUTH.INVALID_TOKEN);
    }
    const accessToken = this.generateAccessToken(decoded.userId, decoded.role);
    return accessToken;
  }

  async forgotPassword(forgotPassword: ForgotPasswordDto): Promise<void> {
    const user = await this.authRepository.getUserByEmail(forgotPassword.email);
    if (!user) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.USER);
    }
    // set expired in
    const expiredTimestamp = Date.now() + 60000; // Waktu saat ini dalam milidetik + 60.000 ms (1 menit)
    const expiredDate = new Date(expiredTimestamp);
    const otp = Utils.GenerateOtp();
    await this.otpRepository.createOtp({
      number: Number(otp),
      expriredIn: expiredDate,
    });
    const sendingOtp = await this.mailService.sendEmail(
      user.email,
      'Request Otp',
      `<p>Please don't send your otp to other people, otp will be expired in a minute</p>
      <p>Your otp is <strong>${otp}</strong></p>`,
    );
    console.log(sendingOtp);
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<void> {
    const otp = await this.otpRepository.verifyOtp(Number(verifyOtpDto.otp));
    const verify = Number(verifyOtpDto.otp) <= otp?.number;
    if (!otp || !verify) {
      throw new BadRequestException(Const.MESSAGE.ERROR.BAD_REQUEST.OTP);
    }
    const expired = otp.expriredIn >= new Date();
    if (!expired) {
      await this.otpRepository.deleteOtp(otp.id);
      throw new BadRequestException(
        Const.MESSAGE.ERROR.BAD_REQUEST.OTP_EXPIRED,
      );
    }
    await this.otpRepository.deleteOtp(otp.id);
  }

  async updatePassword(updatePasswordDto: LoginAuthDto): Promise<void> {
    const user = await this.authRepository.getUserByEmail(
      updatePasswordDto.email,
    );
    if (!user) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.USER);
    }
    const passwordHash = await bcrypt.hash(updatePasswordDto.password, 10);
    await this.authRepository.updatePassword(user.id, passwordHash);
  }

  // utilities token service
  generateAccessToken(userId: string, role: Role): string {
    return this.accessTokenJwt.sign({ userId, role });
  }

  generateRefreshToken(userId: string, role: Role): string {
    return this.refreshTokenJwt.sign({ userId, role });
  }

  verifyAccessToken(token: string): IAuthPayload | null {
    try {
      return this.accessTokenJwt.verify(token);
    } catch {
      return null;
    }
  }

  verifyRefreshToken(token: string): IAuthPayload | Error {
    try {
      return this.refreshTokenJwt.verify(token);
    } catch (error) {
      return error;
    }
  }
}
