import { ApiProperty } from '@nestjs/swagger';
import { GeneralResponse, Meta } from '../../types';

export class GeneralResponseSwagger<T, M = null> extends GeneralResponse<T, M> {
  @ApiProperty({ example: 'Success' })
  status: 'Success' | 'Error';
}

export class MetaSwagger implements Meta {
  @ApiProperty({ example: 1 })
  currentPage: number;

  @ApiProperty({ example: 10 })
  perPage: number;

  @ApiProperty({ example: 3 })
  totalCurrentPage: number;

  @ApiProperty({ example: 1 })
  totalPage: number;

  @ApiProperty({ example: 3 })
  totalData: number;
}
