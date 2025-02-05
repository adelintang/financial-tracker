import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsAlphanumeric, IsEmail } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'email from the user',
    example: 'john@gmail.com',
  })
  email: string;

  @IsAlphanumeric()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'password from the user',
    example: 'johndoe123',
  })
  password: string;
}
