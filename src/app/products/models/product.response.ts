import { ApiProperty } from '@nestjs/swagger';
import { IUserInProduct } from '../../users/models/user.response';
import { CreateProductDto } from '../dto/create-product.dto';

export class IProductImage {
  @ApiProperty({ example: '5c4394f7-d3e3-48d1-8a65-e4324fa71417' })
  id: string;

  @ApiProperty({ example: 'products-image/baxgrllhagyln1s60im8' })
  public_id: string;

  @ApiProperty({
    example:
      'https://res.cloudinary.com/dsrocaowx/image/upload/v1733046217/products-image/baxgrllhagyln1s60im8.jpg',
  })
  file_url: string;
}

export class IProductInUser {
  @ApiProperty({ example: '5c4394f7-d3e3-48d1-8a65-e4324fa71417' })
  id: string;

  @ApiProperty({ example: 'iPhone 16 Pro Max' })
  name: string;

  @ApiProperty({ example: 'Iphone terbaru keluaran terbaru seri 16' })
  desc: string;

  @ApiProperty({ example: 20000000 })
  price: number;

  @ApiProperty({ example: 50 })
  qty: number;

  @ApiProperty({ type: IProductImage })
  productImage: IProductImage | null;
}

export class IProduct extends IProductInUser {
  @ApiProperty({ type: IUserInProduct })
  user: IUserInProduct;
}

export class MutationProductResponse extends CreateProductDto {
  @ApiProperty({ example: '5c4394f7-d3e3-48d1-8a65-e4324fa71418' })
  id: string;
}
