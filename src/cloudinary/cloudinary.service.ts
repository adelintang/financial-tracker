import { BadRequestException, Injectable } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';
import { Const } from '../common/constans';

@Injectable()
export class CloudinaryService {
  async uploadBuffer(
    buffer: Buffer,
    folder: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder, resource_type: 'auto' }, (error, result) => {
          if (error) {
            reject(
              new BadRequestException(
                Const.MESSAGE.ERROR.BAD_REQUEST.UPLOAD_FAILED,
              ),
            );
          }
          resolve(result);
        })
        .end(buffer);
    });
  }
}
