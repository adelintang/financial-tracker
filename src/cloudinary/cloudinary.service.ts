import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { cloudinary } from '../common/config/cloudinary.config';
import { Const } from '../common/constans';

@Injectable()
export class CloudinaryService {
  async uploadFile(
    buffer: Buffer,
    folder: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder, resource_type: 'auto' }, (error, result) => {
          if (error) {
            reject(
              new BadRequestException(
                Const.MESSAGE.ERROR.BAD_REQUEST.UPLOAD_FILE_FAILED,
              ),
            );
          }
          resolve(result);
        })
        .end(buffer);
    });
  }

  async updateFile(
    public_id: string,
    buffer: Buffer,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id,
            overwrite: true,
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) {
              reject(
                new BadRequestException(
                  Const.MESSAGE.ERROR.BAD_REQUEST.UPDATE_FILE_FAILED,
                ),
              );
            }
            resolve(result);
          },
        )
        .end(buffer);
    });
  }

  async deleteFile(publicId: string): Promise<{ result: string }> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        publicId,
        { resource_type: 'image' },
        (error, result) => {
          if (error) {
            reject(
              new BadRequestException(
                Const.MESSAGE.ERROR.BAD_REQUEST.UPDATE_FILE_FAILED,
              ),
            );
          }
          resolve(result);
        },
      );
    });
  }
}
