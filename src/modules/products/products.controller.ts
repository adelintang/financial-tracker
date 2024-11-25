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
import { Utils } from '../../utils';
import { Request } from 'express';
import { QueryParams } from '../../interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from '../users/users.service';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(
    public readonly productService: ProductsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const user = await this.usersService.getUser(createProductDto.user_id);
    if (!user) {
      throw new NotFoundException(Utils.MESSAGE.ERROR.NOT_FOUND.USER);
    }
    const product = await this.productService.createProduct(createProductDto);
    return Utils.Response(
      'Success',
      Utils.MESSAGE.SUCCESS.CREATED.PRODUCT,
      product,
    );
  }

  @Get()
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
      Utils.MESSAGE.SUCCESS.GET.PRODUCTS,
      products,
      meta,
    );
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    if (!product) {
      throw new NotFoundException(Utils.MESSAGE.ERROR.NOT_FOUND.PRODUCT);
    }
    return Utils.Response(
      'Success',
      Utils.MESSAGE.SUCCESS.GET.PRODUCT,
      product,
    );
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productService.getProduct(id);
    if (!product) {
      throw new NotFoundException(Utils.MESSAGE.ERROR.NOT_FOUND.PRODUCT);
    }
    const updatedProduct = await this.productService.updateProduct(
      id,
      updateProductDto,
    );
    return Utils.Response(
      'Success',
      Utils.MESSAGE.SUCCESS.UPDATED.PRODUCT,
      updatedProduct,
    );
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    if (!product) {
      throw new NotFoundException(Utils.MESSAGE.ERROR.NOT_FOUND.PRODUCT);
    }
    const deletedProduct = await this.productService.deleteProduct(id);
    return Utils.Response(
      'Success',
      Utils.MESSAGE.SUCCESS.DELETED.PRODUCT,
      deletedProduct,
    );
  }
}
