// import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { PartialType, OmitType } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['user_id'] as const),
) {}
