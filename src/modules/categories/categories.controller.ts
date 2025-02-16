import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { Request } from 'express';
import { TransactionType } from '@prisma/client';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Const } from '../../common/constans';
import { Utils } from '../../common/utils';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { QueryParams } from '../../types';
import {
  CategoriesResponseSwagger,
  CreateCategoryResponseSwagger,
} from './swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Endpoint to Create Category' })
  @ApiCreatedResponse({
    description: 'Successfully created category',
    type: CreateCategoryResponseSwagger,
  })
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const category =
      await this.categoriesService.createCategory(createCategoryDto);
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.CREATED.CATEGORY,
      category,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Endpoint to Create Category' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'type', required: false, enum: TransactionType })
  @ApiOkResponse({
    description: 'Successfully fetched categories',
    type: CategoriesResponseSwagger,
  })
  async getCategories(
    @Req() req: Request & { query: QueryParams & { type: TransactionType } },
  ) {
    const categories = await this.categoriesService.getCategories(req.query);
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.GET.CATEGORIES,
      categories,
    );
  }
}
