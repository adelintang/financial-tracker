import { ApiProperty } from '@nestjs/swagger';
import { GeneralResponseSwagger } from '../../../common/swagger';
import { Const } from '../../../common/constans';
import { MutationProductImageResponse } from '../dto/product-image.response';

export class CreateProductImageResponseSwagger extends GeneralResponseSwagger<MutationProductImageResponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.CREATED.PRODUCT_IMAGE })
  message: string;

  @ApiProperty({ type: MutationProductImageResponse })
  data: MutationProductImageResponse;
}

export class UpdateProductImageResponseSwagger extends GeneralResponseSwagger<MutationProductImageResponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.UPDATED.PRODUCT_IMAGE })
  message: string;

  @ApiProperty({ type: MutationProductImageResponse })
  data: MutationProductImageResponse;
}

export class DeleteProductImageResponseSwagger extends GeneralResponseSwagger<MutationProductImageResponse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.DELETED.PRODUCT_IMAGE })
  message: string;

  @ApiProperty({ type: MutationProductImageResponse })
  data: MutationProductImageResponse;
}
