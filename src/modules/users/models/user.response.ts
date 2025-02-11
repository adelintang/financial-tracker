import { Currency } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ example: 'f1054ce2-75f5-9f1e-d35d6d' })
  id: string;

  @ApiProperty({ example: 'john@gmail.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: Currency.IDR })
  currency: Currency;
}
