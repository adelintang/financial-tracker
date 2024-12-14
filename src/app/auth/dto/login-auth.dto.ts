import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsAlphanumeric } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsAlphanumeric()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
