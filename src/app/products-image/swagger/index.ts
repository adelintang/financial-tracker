import { ApiProperty } from '@nestjs/swagger';
import { CreateProductImageDto } from '../dto/create-product-image.dto';
import { GeneralResponseSwagger } from '../../../common/swagger';
import { Const } from '../../../common/constans';

class MutationProductImageResponse extends CreateProductImageDto {
  @ApiProperty({ example: '5c4394f7-d3e3-48d1-8a65-e4324fa71419' })
  id: string;
}

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
