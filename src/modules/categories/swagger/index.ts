import { CategoryResonse } from '../models/category.response';
import { ApiProperty } from '@nestjs/swagger';
import { Const } from '../../../common/constans';
import { GeneralResponseSwagger } from '../../../common/swagger';

export class CreateCategoryResponseSwagger extends GeneralResponseSwagger<CategoryResonse> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.CREATED.CATEGORY })
  message: string;

  @ApiProperty({ type: CategoryResonse })
  data: CategoryResonse;
}

export class CategoriesResponseSwagger extends GeneralResponseSwagger<
  CategoryResonse[]
> {
  @ApiProperty({ example: Const.MESSAGE.SUCCESS.GET.CATEGORIES })
  message: string;

  @ApiProperty({ type: [CategoryResonse] })
  data: CategoryResonse[];
}
