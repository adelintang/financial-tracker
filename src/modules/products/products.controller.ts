import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Utils } from '../../common/utils';
import { Request } from 'express';
import { QueryParams } from '../../interfaces';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Const } from '../../common/constans';
import { IsOwnerProductGuard } from '../../common/guards/is-owner-product.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @Roles('SELLER')
  @ApiOperation({ summary: 'Endpoint for create product' })
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.createProduct(createProductDto);
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.CREATED.PRODUCT,
      product,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Endpoint for get all product' })
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'search', required: false })
  async getProducts(@Req() req: Request & { query: QueryParams }) {
    const { products, meta } = await this.productService.getProducts(req.query);
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.GET.PRODUCTS,
      products,
      meta,
    );
  }

  @Get(':productId')
  @ApiOperation({ summary: 'Endpoint for get product by id' })
  async getProduct(@Param('productId') productId: string) {
    const product = await this.productService.getProduct(productId);
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.GET.PRODUCT,
      product,
    );
  }

  @Patch(':productId')
  @Roles('SELLER')
  @UseGuards(IsOwnerProductGuard)
  @ApiOperation({ summary: 'Endpoint for update product' })
  async updateProduct(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productService.updateProduct(
      productId,
      updateProductDto,
    );
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.UPDATED.PRODUCT,
      product,
    );
  }

  @Delete(':productId')
  @Roles('SELLER')
  @UseGuards(IsOwnerProductGuard)
  @ApiOperation({ summary: 'Endpoint for delete product' })
  async deleteProduct(@Param('productId') productId: string) {
    const product = await this.productService.deleteProduct(productId);
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.DELETED.PRODUCT,
      product,
    );
  }
}
