import { ApiProperty } from '@nestjs/swagger';
import { GeneralResponse } from '../../../types';
import { Const } from 'src/common/constans';

export class LoginAuthResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YzQzOTRmNy1kM2UzLTQ4ZDEtOGE2NS1lNDMyNGZhNzE0MmQiLCJyb2xlIjoiU0VMTEVSIiwiaWF0IjoxNzM0MzQ2MjcwLCJleHAiOjE3MzQ0MzI2NzB9.AOjWBphtOJZs2KuBUxjdVAi5sCmLOvMl3Gesp4yVgJD',
  })
  accessToken: string;

  refreshToken: string;
}

export class LoginAuthResponseSwagger
  implements GeneralResponse<LoginAuthResponse>
{
  @ApiProperty({ example: 'Success' })
  status: 'Success' | 'Error';

  @ApiProperty({ example: Const.MESSAGE.SUCCESS.AUTH.LOGIN })
  message: string;

  @ApiProperty({ type: LoginAuthResponse })
  data: LoginAuthResponse;
}
