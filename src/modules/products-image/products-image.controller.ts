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
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { ProductsImageService } from './products-image.service';
import { Const } from '../../common/constans';
import { IsOwnerGuard } from '../../common/guards/is-owner.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Utils } from '../../common/utils';
import { IsOwnerProductImage } from '../../common/guards/is-owner-product-image.guard';

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
  @UseGuards(IsOwnerGuard)
  @UseInterceptors(FileInterceptor('file'))
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
  @UseGuards(IsOwnerProductImage)
  @UseInterceptors(FileInterceptor('file'))
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
  @UseGuards(IsOwnerProductImage)
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
