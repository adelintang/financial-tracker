import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class RegisterAuthResponse {
  @ApiProperty({ example: '5c4394f7-d3e3-48d1-8a65-e4324fa7141e' })
  id: string;

  @ApiProperty({ example: 'johndoe' })
  username: string;

  @ApiProperty({ enum: [Role.SELLER, Role.CONSUMER] })
  role: Role;
}
