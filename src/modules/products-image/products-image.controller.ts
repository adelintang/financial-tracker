import {
  Controller,
  Delete,
  NotFoundException,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '../../common/pipes/file-validaton.pipe';
import { ProductsService } from '../products/products.service';
import { CloudinaryService } from '../../common/cloudinary.service';
import { ProductsImageService } from './products-image.service';
import { Const } from '../../common/constans';
import { IsOwnerProductGuard } from '../../common/guards/is-owner-product.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Utils } from '../../common/utils';
import { IsOwnerProductImageGuard } from '../../common/guards/is-owner-product-image.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products-image')
export class ProductsImageController {
  constructor(
    private readonly productImageService: ProductsImageService,
    private readonly productService: ProductsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post(':productId/upload')
  @Roles('SELLER')
  @UseGuards(IsOwnerProductGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Endpoint for upload product image',
    requestBody: Const.REQ_BODY_WITH_FILE,
  })
  async uploadProductImage(
    @Param('productId') productId: string,
    @UploadedFile(FileValidationPipe)
    file: Express.Multer.File,
  ) {
    const product = await this.productService.getProduct(productId);
    if (!product) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.PRODUCT);
    }
    const upload = await this.cloudinaryService.uploadFile(
      file.buffer,
      'products-image',
    );
    const productImage = {
      public_id: upload.public_id,
      filename: `${upload.public_id}.${upload.format}`,
      size: upload.bytes,
      file_url: upload.secure_url,
      product_id: productId,
    };
    const createProductImage =
      await this.productImageService.createProductImage(productImage);
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.CREATED.PRODUCT_IMAGE,
      createProductImage,
    );
  }

  @Patch(':productImageId/upload')
  @Roles('SELLER')
  @UseGuards(IsOwnerProductImageGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Endpoint for update product image',
    requestBody: Const.REQ_BODY_WITH_FILE,
  })
  async updateProductImage(
    @Param('productImageId') productImageId: string,
    @UploadedFile(FileValidationPipe)
    file: Express.Multer.File,
  ) {
    const productImage =
      await this.productImageService.getProductImage(productImageId);
    if (!productImage) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.PRODUCT_IMAGE);
    }
    const upload = await this.cloudinaryService.updateFile(
      productImage.public_id,
      file.buffer,
    );
    const updateProductImage = {
      filename: `${upload.public_id}.${upload.format}`,
      size: upload.bytes,
      file_url: upload.secure_url,
    };
    const updatedProductImage =
      await this.productImageService.updateProductImage(
        productImageId,
        updateProductImage,
      );
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.UPDATED.PRODUCT_IMAGE,
      updatedProductImage,
    );
  }

  @Delete(':productImageId')
  @Roles('SELLER')
  @UseGuards(IsOwnerProductImageGuard)
  @ApiOperation({ summary: 'Endpoint for delete product image' })
  async deleteProductImage(@Param('productImageId') productImageId: string) {
    const productImage =
      await this.productImageService.getProductImage(productImageId);
    if (!productImage) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.PRODUCT_IMAGE);
    }
    await this.cloudinaryService.deleteFile(productImage.public_id);
    const deletedProductImage =
      await this.productImageService.deleteProductImage(productImageId);
    return Utils.Response(
      'Success',
      Const.MESSAGE.SUCCESS.DELETED.PRODUCT_IMAGE,
      deletedProductImage,
    );
  }
}
