import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductsImageRepository } from './repository/products-image.repository';
import { ProductsService } from '../products/products.service';
import { CloudinaryService } from '../../common/providers/cloudinary/cloudinary.service';
import { Const } from '../../common/constans';
import { MutationProductImageResponse } from './models/product-image.response';

@Injectable()
export class ProductsImageService {
  constructor(
    private readonly productsImageRepository: ProductsImageRepository,
    private readonly productService: ProductsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createProductImage(
    productId: string,
    file: Express.Multer.File,
  ): Promise<MutationProductImageResponse> {
    await this.productService.getProduct(productId);
    const alreadyProductImage =
      await this.productsImageRepository.getProductImageByProductId(productId);
    if (alreadyProductImage) {
      throw new BadRequestException(
        Const.MESSAGE.ERROR.BAD_REQUEST.PRODUCT_IMAGE_ALREADY_EXISTS,
      );
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
      await this.productsImageRepository.createProductImage(productImage);
    return createProductImage;
  }

  async updateProductImage(
    productImageId: string,
    file: Express.Multer.File,
  ): Promise<MutationProductImageResponse> {
    const productImage =
      await this.productsImageRepository.getProductImage(productImageId);
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
      await this.productsImageRepository.updateProductImage(
        productImageId,
        updateProductImage,
      );
    return updatedProductImage;
  }

  async deleteProductImage(
    productImageId: string,
  ): Promise<MutationProductImageResponse> {
    const productImage =
      await this.productsImageRepository.getProductImage(productImageId);
    if (!productImage) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.PRODUCT_IMAGE);
    }
    await this.cloudinaryService.deleteFile(productImage.public_id);
    const deletedProductImage =
      await this.productsImageRepository.deleteProductImage(productImageId);
    return deletedProductImage;
  }
}
