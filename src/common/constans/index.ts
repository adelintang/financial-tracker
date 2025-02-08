import { RequestBodyObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export class Const {
  static ACCESS_TOKEN_PROVIDER: string = 'ACCESS_TOKEN_JWT';
  static REFRESH_TOKEN_PROVIDER: string = 'REFRESH_TOKEN_JWT';
  static REFRESH_TOKEN_NAME: string = 'refreshToken';
  static ROLES_KEY: string = 'roles';
  static SWAGGER_REQ_BODY_WITH_FILE: RequestBodyObject = {
    required: true,
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
          },
          required: ['file'],
        },
      },
    },
  };
  static MESSAGE = {
    SUCCESS: {
      GET: {
        USERS: 'Users Fetched Successfully',
        USER: 'User Fetched Successfully',
        PRODUCTS: 'Products Fetched Successfully',
        PRODUCT: 'Product Fetched Successfully',
      },
      CREATED: {
        USER: 'Registration User Successfully',
        PRODUCT: 'Product Create Successfully',
        PRODUCT_IMAGE: 'Product Image Uploaded Successfully',
        OTP: 'Otp Send to your email Successfully',
      },
      UPDATED: {
        PRODUCT: 'Product Updated Successfully',
        PRODUCT_IMAGE: 'Product Image Updated Successfully',
      },
      DELETED: {
        PRODUCT: 'Product Deleted Successfully',
        PRODUCT_IMAGE: 'Product Image Deleted Successfully',
      },
      AUTH: {
        LOGIN: 'Login Successfully',
        ACCESS_TOKEN: 'Access Token Fetched Successfully',
      },
    },
    ERROR: {
      BAD_REQUEST: {
        EMAIL: 'Email already used',
        INVALID_CREDENTIALS: 'Email or password wrong',
        INVALID_FILE_TYPE:
          'Invalid file type. Only JPG, JPEG, and PNG files are allowed',
        INVALID_FILE_SIZE:
          'File size exceeds the 1MB limit. Please upload a smaller file',
        INVALID_FILE_VALIDATION: 'File validation failed',
        UPLOAD_FILE_FAILED: 'Upload file failed',
        UPDATE_FILE_FAILED: 'Update file failed',
        DELETE_FILE_FAILED: 'Delete file failed',
        PRODUCT_IMAGE_ALREADY_EXISTS: 'Product Image already exists',
      },
      NOT_FOUND: {
        USER: 'User not found',
        PRODUCT: 'Product not found',
        PRODUCT_IMAGE: 'Product Image not found',
      },
      AUTH: {
        NO_TOKEN: 'Token not provided',
        EXPIRED_TOKEN: 'Token has expired',
        INVALID_TOKEN: 'Invalid JWT token',
      },
      FORBIDDEN: {
        USER: 'User does not have access',
        ROLE: 'User does not have role',
      },
    },
  };
}
