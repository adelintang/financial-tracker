import { IsString, IsNotEmpty, IsAlphanumeric } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsAlphanumeric()
  @IsString()
  @IsNotEmpty()
  password: string;
}
