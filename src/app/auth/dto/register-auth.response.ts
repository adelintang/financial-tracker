import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { GeneralResponse } from '../../../types';
import { Const } from 'src/common/constans';

export class RegisterAuthResponse {
  @ApiProperty({ example: '5c4394f7-d3e3-48d1-8a65-e4324fa7141e' })
  id: string;

  @ApiProperty({ example: 'johndoe' })
  username: string;

  @ApiProperty({ enum: [Role.SELLER, Role.CONSUMER] })
  role: Role;
}

export class RegisterAuthResponseSwagger
  implements GeneralResponse<RegisterAuthResponse>
{
  @ApiProperty({ example: 'Success' })
  status: 'Success' | 'Error';

  @ApiProperty({ example: Const.MESSAGE.SUCCESS.CREATED.USER })
  message: string;

  @ApiProperty({ type: RegisterAuthResponse })
  data: RegisterAuthResponse;
}
