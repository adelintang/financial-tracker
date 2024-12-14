import {
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '../../common/pipes/file-validaton.pipe';
import { ProductsImageService } from './products-image.service';
import { Const } from '../../common/constans';
import { IsOwnerProductGuard } from '../../common/guards/is-owner-product.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Utils } from '../../common/utils';
import { IsOwnerProductImageGuard } from '../../common/guards/is-owner-product-image.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products-image')
export class ProductsImageController {
  constructor(private readonly productImageService: ProductsImageService) {}

  @Post(':productId/upload')
  @Roles('SELLER')
  @UseGuards(IsOwnerProductGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Endpoint for upload product image',
    requestBody: Const.SWAGGER_REQ_BODY_WITH_FILE,
  })
  async uploadProductImage(
    @Param('productId') productId: string,
    @UploadedFile(FileValidationPipe)
    file: Express.Multer.File,
  ) {
    const productImage = await this.productImageService.createProductImage(
      productId,
      file,
    );
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.CREATED.PRODUCT_IMAGE,
      productImage,
    );
  }

  @Patch(':productImageId/upload')
  @Roles('SELLER')
  @UseGuards(IsOwnerProductImageGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Endpoint for update product image',
    requestBody: Const.SWAGGER_REQ_BODY_WITH_FILE,
  })
  async updateProductImage(
    @Param('productImageId') productImageId: string,
    @UploadedFile(FileValidationPipe)
    file: Express.Multer.File,
  ) {
    const productImage = await this.productImageService.updateProductImage(
      productImageId,
      file,
    );
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.UPDATED.PRODUCT_IMAGE,
      productImage,
    );
  }

  @Delete(':productImageId')
  @Roles('SELLER')
  @UseGuards(IsOwnerProductImageGuard)
  @ApiOperation({ summary: 'Endpoint for delete product image' })
  async deleteProductImage(@Param('productImageId') productImageId: string) {
    const productImage =
      await this.productImageService.deleteProductImage(productImageId);
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.DELETED.PRODUCT_IMAGE,
      productImage,
    );
  }
}
