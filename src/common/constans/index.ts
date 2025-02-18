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
        OTP: 'Otp verified Successfully',
        CATEGORIES: 'Categories Fetched Successfully',
        INVESTMENT_TYPES: 'Investment Types Fetched Successfully',
        EXPENSE_TRANSACTIONS: 'Expense Transactions Fetched Successfully',
        INCOME_TRANSACTIONS: 'Income Transactions Fetched Successfully',
        TRANSACTION: 'Transaction Fetched Successfully',
      },
      CREATED: {
        USER: 'Registration User Successfully',
        OTP: 'Otp Send to your email Successfully',
        CATEGORY: 'Category Created Successfully',
        INVESTMENT_TYPE: 'Investment Type Created Successfully',
        TRANSACTION: 'Transaction Created Successfully',
      },
      UPDATED: {
        PASSWORD: 'Password Updated Successfully',
        TRANSACTION: 'Transaction Updated Successfully',
      },
      DELETED: {
        TRANSACTION: 'Transaction Deleted Successfully',
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
        OTP: 'Otp not matched',
        OTP_EXPIRED: 'Otp Expired',
        CATEGORY: 'Category already used',
        INVESTMENT_TYPE: 'Investment Type already used',
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
        CATEGORY: 'Category not found',
        TRANSACTION: 'Transaction not found',
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
