import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsAlphanumeric } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'username from the user',
    example: 'johndoe',
  })
  username: string;

  @IsAlphanumeric()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'password from the user',
    example: 'johndoe123',
  })
  password: string;
}
