import { ApiProperty } from '@nestjs/swagger';

export class CreateProductImageDto {
  @ApiProperty({ example: 'products-image/baxgrllhagyln1s60im8' })
  public_id: string;

  @ApiProperty({
    example:
      'https://res.cloudinary.com/dsrocaowx/image/upload/v1733046217/products-image/baxgrllhagyln1s60im8.jpg',
  })
  file_url: string;

  @ApiProperty({ example: 'products-image/baxgrllhagyln1s60im8.jpg' })
  filename: string;

  @ApiProperty({ example: 6257 })
  size: number;

  @ApiProperty({ example: '5c4394f7-d3e3-48d1-8a65-e4324fa71417' })
  product_id: string;
}
