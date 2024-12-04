import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateProductImageDto } from './create-product-image.dto';

export class UpdateProductImageDto extends PartialType(
  OmitType(CreateProductImageDto, ['product_id', 'public_id'] as const),
) {}
