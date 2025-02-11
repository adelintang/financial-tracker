import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
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
        id: `otp-${uuidv4()}`,
        number: number,
        expriredIn: expriredIn,
      },
    });
  }

  async verifyOtp(number: number) {
    return this.prisma.otp.findUnique({
      where: {
        number,
      },
    });
  }

  async deleteOtp(otpId: string) {
    return this.prisma.otp.delete({
      where: {
        id: otpId,
      },
    });
  }
}
