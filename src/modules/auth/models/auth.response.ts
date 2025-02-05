import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '@prisma/client';
import { PartialType, OmitType } from '@nestjs/swagger';

export class RegisterAuthResponse {
  @ApiProperty({ example: 'user-5c4394f7-d3e3-48d1-8a65-e4324fa7141e' })
  id: string;

  @ApiProperty({ example: 'john@gmail.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ enum: [Currency.IDR, Currency.USD] })
  currency: Currency;
}

export class LoginAuthResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YzQzOTRmNy1kM2UzLTQ4ZDEtOGE2NS1lNDMyNGZhNzE0MmQiLCJyb2xlIjoiU0VMTEVSIiwiaWF0IjoxNzM0MzQ2MjcwLCJleHAiOjE3MzQ0MzI2NzB9.AOjWBphtOJZs2KuBUxjdVAi5sCmLOvMl3Gesp4yVgJD',
  })
  accessToken: string;

  refreshToken: string;
}

export class RefreshTokenResponse extends PartialType(
  OmitType(LoginAuthResponse, ['refreshToken'] as const),
) {}
