import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of product',
    example: 'iPhone 16 Pro Max',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Description of product',
    example: 'Iphone terbaru keluaran terbaru seri 16',
  })
  desc: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Price of product',
    example: 20000000,
  })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Qty of product',
    example: 50,
  })
  qty: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'id of user',
    example: '5c4394f7-d3e3-48d1-8a65-e4324fa7141e',
  })
  user_id: string;
}
