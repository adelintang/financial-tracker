import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, Max, Min } from 'class-validator';

export class CreateReportDto {
  @Min(1)
  @Max(12)
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'month report',
    example: '1',
  })
  month: number;

  @Min(2000)
  @Max(new Date().getFullYear())
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'year report',
    example: '2025',
  })
  year: number;
}
