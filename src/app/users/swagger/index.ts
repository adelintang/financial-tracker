import { ApiProperty } from '@nestjs/swagger';
import { Const } from '../../../common/constans';
import { GeneralResponseSwagger, MetaSwagger } from '../../../common/swagger';

export class UserResponseSwagger extends GeneralResponseSwagger<any> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.GET.USER })
  message: string;

  @ApiProperty({})
  data: any;
}

export class UsersResponseSwagger extends GeneralResponseSwagger<
  any[],
  MetaSwagger
> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.GET.USERS })
  message: string;

  @ApiProperty({})
  data: any[];

  @ApiProperty({ type: MetaSwagger })
  meta?: MetaSwagger;
}
