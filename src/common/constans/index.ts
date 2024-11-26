export class Const {
  static ACCESS_TOKEN_PROVIDER: string = 'ACCESS_TOKEN_JWT';
  static REFRESH_TOKEN_PROVIDER: string = 'REFRESH_TOKEN_JWT';
  static REFRESH_TOKEN_NAME: string = 'refreshToken';
  static ROLES_KEY: string = 'roles';
  static ROLES_GUARD_PROVIDER: string = 'ROLES_GUARD';
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
      },
      UPDATED: {
        PRODUCT: 'Product Updated Successfully',
      },
      DELETED: {
        PRODUCT: 'Product Deleted Successfully',
      },
      AUTH: {
        LOGIN: 'Login Successfully',
        ACCESS_TOKEN: 'Access Token Fetched Successfully',
      },
    },
    ERROR: {
      BAD_REQUEST: {
        USERNAME: 'Username already used',
        INVALID_CREDENTIALS: 'Username or password wrong',
      },
      NOT_FOUND: {
        USER: 'User not found',
        PRODUCT: 'Product not found',
      },
      AUTH: {
        NO_TOKEN: 'Token not provided',
        INVALID_TOKEN: 'Invalid token',
      },
    },
  };
}
