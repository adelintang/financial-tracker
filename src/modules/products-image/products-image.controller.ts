import {
  Controller,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '../../common/pipes/file-validaton.pipe';

@Controller('products-image')
export class ProductsImageController {
  @Post(':productId/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadProductImage(
    @UploadedFile(FileValidationPipe)
    file: Express.Multer.File,
  ) {
    console.log(file);
    return {
      file: file.buffer.toString(),
    };
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
