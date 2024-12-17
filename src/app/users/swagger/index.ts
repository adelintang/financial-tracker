import { ApiProperty } from '@nestjs/swagger';
import { Const } from '../../../common/constans';
import { GeneralResponseSwagger, MetaSwagger } from '../../../common/swagger';
import { IUser } from '../models/user.response';

export class UserResponseSwagger extends GeneralResponseSwagger<IUser> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.GET.USER })
  message: string;

  @ApiProperty({ type: IUser })
  data: IUser;
}

export class UsersResponseSwagger extends GeneralResponseSwagger<
  IUser[],
  MetaSwagger
> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.GET.USERS })
  message: string;

  @ApiProperty({ type: [IUser] })
  data: IUser[];

  @ApiProperty({ type: MetaSwagger })
  meta?: MetaSwagger;
}
