import {
  Controller,
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
    return await this.productImageService.createProductImage(productImage);
  }

  @Patch(':productImageId/upload')
  @UseInterceptors(FileInterceptor('file'))
  updateProductImage(
    @UploadedFile(FileValidationPipe)
    file: Express.Multer.File,
  ) {
    console.log(file);
    return {
      file: file.buffer.toString(),
    };
  }
}
