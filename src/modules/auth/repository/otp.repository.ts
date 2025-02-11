import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/providers/prisma/prisma.service';

@Injectable()
export class OtpRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createOtp({
    number,
    expriredIn,
  }: {
    number: number;
    expriredIn: Date;
  }) {
    return this.prisma.otp.create({
      data: {
        number: number,
        expriredIn: expriredIn,
      },
    });
  }

  async verifyOtp(number: number) {
    return this.prisma.otp.findUnique({
      where: {
        number,
        isActive: true,
      },
    });
  }

  async setExpiredOtp(otpId: string) {
    return this.prisma.otp.update({
      where: {
        id: otpId,
        isActive: true,
      },
      data: {
        isActive: false,
      },
    });
  }
}
