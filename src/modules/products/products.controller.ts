import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
import { UsersService } from '../users/users.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Const } from '../../common/constans';
import { IsOwnerProductGuard } from '../../common/guards/is-owner-product.guard';
import { productMapper, productsMapper } from './dto/product.mapper';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productService: ProductsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @Roles('SELLER')
  @ApiOperation({ summary: 'Endpoint for create product' })
  async createProduct(@Body() createProductDto: CreateProductDto) {
    await this.usersService.getUser(createProductDto.user_id);
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
    const { query } = req;
    const { page = '1', perPage = '10' } = query;
    const [products, totalData] = await Promise.all([
      this.productService.getProducts(query),
      this.productService.getProductsCount(query),
    ]);
    const meta = Utils.MetaPagination(
      Number(page),
      Number(perPage),
      products.length,
      totalData,
    );
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.GET.PRODUCTS,
      productsMapper(products),
      meta,
    );
  }

  @Get(':productId')
  @ApiOperation({ summary: 'Endpoint for get product by id' })
  async getProduct(@Param('productId') productId: string) {
    const product = await this.productService.getProduct(productId);
    if (!product) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.PRODUCT);
    }
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.GET.PRODUCT,
      productMapper(product),
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
    const product = await this.productService.getProduct(productId);
    if (!product) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.PRODUCT);
    }
    const updatedProduct = await this.productService.updateProduct(
      productId,
      updateProductDto,
    );
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.UPDATED.PRODUCT,
      updatedProduct,
    );
  }

  @Delete(':productId')
  @Roles('SELLER')
  @UseGuards(IsOwnerProductGuard)
  @ApiOperation({ summary: 'Endpoint for delete product' })
  async deleteProduct(@Param('productId') productId: string) {
    const product = await this.productService.getProduct(productId);
    if (!product) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.PRODUCT);
    }
    const deletedProduct = await this.productService.deleteProduct(productId);
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.DELETED.PRODUCT,
      deletedProduct,
    );
  }
}
