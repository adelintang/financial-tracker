import { ApiProperty } from '@nestjs/swagger';
import { GeneralResponseSwagger, MetaSwagger } from '../../../common/swagger';
import { IProduct } from '../dto/product.response';
import { Const } from '../../../common/constans';
import { CreateProductDto } from '../dto/create-product.dto';

export class ProductsResponseSwagger extends GeneralResponseSwagger<
  IProduct[],
  MetaSwagger
> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.GET.PRODUCTS })
  message: string;

  @ApiProperty({ type: [IProduct] })
  data: IProduct[];

  @ApiProperty({ type: MetaSwagger })
  meta?: MetaSwagger;
}

export class ProductResponseSwagger extends GeneralResponseSwagger<IProduct> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.GET.PRODUCT })
  message: string;

  @ApiProperty({ type: IProduct })
  data: IProduct;
}

class CreateProductResponse extends CreateProductDto {
  @ApiProperty({ example: '5c4394f7-d3e3-48d1-8a65-e4324fa71418' })
  id: string;
}

export class CreateProductResponseSwagger extends GeneralResponseSwagger<CreateProductResponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.CREATED.PRODUCT })
  message: string;

  @ApiProperty({ type: CreateProductResponse })
  data: CreateProductResponse;
}

export class UpdateProductResponseSwagger extends GeneralResponseSwagger<CreateProductResponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.UPDATED.PRODUCT })
  message: string;

  @ApiProperty({ type: CreateProductResponse })
  data: CreateProductResponse;
}

export class DeleteProductResponseSwagger extends GeneralResponseSwagger<CreateProductResponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.DELETED.PRODUCT })
  message: string;

  @ApiProperty({ type: CreateProductResponse })
  data: CreateProductResponse;
}
