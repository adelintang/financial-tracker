import { ApiProperty } from '@nestjs/swagger';
import { GeneralResponseSwagger, MetaSwagger } from '../../../common/swagger';
import { IProduct } from '../dto/product.response';
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
