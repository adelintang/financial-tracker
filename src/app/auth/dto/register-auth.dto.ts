import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  MinLength,
  IsAlphanumeric,
} from 'class-validator';

export class RegisterAuthDto {
  @MinLength(4)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsAlphanumeric()
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  @ApiProperty({ enum: [Role.SELLER, Role.CONSUMER] })
  role: Role;
}
