import { ApiProperty } from '@nestjs/swagger';
import { GeneralResponseSwagger, MetaSwagger } from '../../../common/swagger';
import { IProduct, MutationProductResponse } from '../dto/product.response';
import { Const } from '../../../common/constans';

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

export class CreateProductResponseSwagger extends GeneralResponseSwagger<MutationProductResponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.CREATED.PRODUCT })
  message: string;

  @ApiProperty({ type: MutationProductResponse })
  data: MutationProductResponse;
}

export class UpdateProductResponseSwagger extends GeneralResponseSwagger<MutationProductResponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.UPDATED.PRODUCT })
  message: string;

  @ApiProperty({ type: MutationProductResponse })
  data: MutationProductResponse;
}

export class DeleteProductResponseSwagger extends GeneralResponseSwagger<MutationProductResponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.DELETED.PRODUCT })
  message: string;

  @ApiProperty({ type: MutationProductResponse })
  data: MutationProductResponse;
}
