import {
  BadRequestException,
  FileTypeValidator,
  Injectable,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { Const } from '../constans';

@Injectable()
export class FileValidationPipe extends ParseFilePipe {
  constructor() {
    super({
      validators: [
        new FileTypeValidator({ fileType: /(jpg|jpeg|png)/ }),
        new MaxFileSizeValidator({ maxSize: 1 * 1024 * 1024 }),
      ],
      exceptionFactory(error) {
        if (error.includes('expected type')) {
          return new BadRequestException(
            Const.MESSAGE.ERROR.BAD_REQUEST.INVALID_FILE_TYPE,
          );
        }
        if (error.includes('expected size')) {
          return new BadRequestException(
            Const.MESSAGE.ERROR.BAD_REQUEST.INVALID_FILE_SIZE,
          );
        }
        return new BadRequestException(
          Const.MESSAGE.ERROR.BAD_REQUEST.INVALID_FILE_VALIDATION,
        );
      },
    });
  }
}
