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
  username: string;

  @IsAlphanumeric()
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
