import { BadRequestException } from '@nestjs/common';
import { GeneralResponse, Meta } from '../../types';

export class Utils {
  static Response<T, M = null>(
    status: 'Success' | 'Error',
    message: string,
    data: T,
    meta?: M,
  ): GeneralResponse<T, M> {
    return {
      status,
      message,
      data,
      meta,
    };
  }

  static MetaPagination(
    page: number,
    perPage: number,
    totalCurrentPage: number,
    total: number,
  ): Meta {
    return {
      currentPage: page,
      perPage,
      totalCurrentPage,
      totalPage: Math.ceil(total / perPage),
      totalData: total,
    };
  }

  static GenerateOtp() {
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  }

  static validateLastDateInMonth(month: number) {
    const thirtyOnes = [1, 3, 5, 7, 8, 10, 12];
    const thirty = [4, 6, 9, 11];
    const date = new Date().getDate();
    if ((month === 2 && date !== 28) || (month === 2 && date !== 29)) {
      throw new BadRequestException('You must can only pick in date 28 or 29');
    }
    const thirtyOnesResult = thirtyOnes.includes(month);
    if (thirtyOnesResult && date !== 31) {
      throw new BadRequestException('You must can only pick in date 31');
    }
    const thirtyResult = thirty.includes(month);
    if (thirtyResult && date !== 30) {
      throw new BadRequestException('You must can only pick in date 30');
    }
  }
}
