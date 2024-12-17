import { ApiProperty } from '@nestjs/swagger';
import { CreateProductImageDto } from './create-product-image.dto';

export class MutationProductImageResponse extends CreateProductImageDto {
  @ApiProperty({ example: '5c4394f7-d3e3-48d1-8a65-e4324fa71419' })
  id: string;
}
