import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YzQzOTRmNy1kM2UzLTQ4ZDEtOGE2NS1lNDMyNGZhNzE0MmQiLCJyb2xlIjoiU0VMTEVSIiwiaWF0IjoxNzM0MzQ2MjcwLCJleHAiOjE3MzQ0MzI2NzB9.AOjWBphtOJZs2KuBUxjdVAi5sCmLOvMl3Gesp4yVgJD',
  })
  accessToken: string;

  refreshToken: string;
}
