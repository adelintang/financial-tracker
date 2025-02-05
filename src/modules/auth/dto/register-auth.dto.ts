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
  @ApiProperty({
    description: 'username from the user',
    example: 'johndoe',
  })
  username: string;

  @IsAlphanumeric()
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'password from the user',
    example: 'johndoe123',
  })
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  @ApiProperty({ enum: [Role.USER, Role.ADMIN] })
  role: Role;
}
