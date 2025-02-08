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
}
