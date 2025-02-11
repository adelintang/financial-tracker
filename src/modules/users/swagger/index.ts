import { ApiProperty } from '@nestjs/swagger';
import { Const } from '../../../common/constans';
import { GeneralResponseSwagger, MetaSwagger } from '../../../common/swagger';
import { UserResponse } from '../models/user.response';

export class UserResponseSwagger extends GeneralResponseSwagger<UserResponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.GET.USER })
  message: string;

  @ApiProperty({ type: UserResponse })
  data: UserResponse;
}

export class UsersResponseSwagger extends GeneralResponseSwagger<
  UserResponse[],
  MetaSwagger
> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.GET.USERS })
  message: string;

  @ApiProperty({ type: [UserResponse] })
  data: UserResponse[];

  @ApiProperty({ type: MetaSwagger })
  meta?: MetaSwagger;
}
