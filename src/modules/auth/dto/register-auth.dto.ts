import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  MinLength,
  IsAlphanumeric,
  IsEmail,
} from 'class-validator';

export class RegisterAuthDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'email from the user',
    example: 'john@gmail.com',
  })
  email: string;

  @MinLength(4)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'name from the user',
    example: 'John Doe',
  })
  name: string;

  @IsAlphanumeric()
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'password from the user',
    example: 'johndoe123',
  })
  password: string;

  @IsEnum(Currency)
  @IsNotEmpty()
  @ApiProperty({ enum: [Currency.IDR, Currency.USD] })
  currency: Currency;
}
