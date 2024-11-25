export class Utils {
  static Response<T, M = null>(
    status: 'Success' | 'Error',
    message: string,
    data: T,
    meta?: M,
  ) {
    return {
      status,
      message,
      data,
      meta,
    };
  }
  static MESSAGE = {
    SUCCESS: {
      GET: {
        USERS: 'Users Fetched Successfully',
        USER: 'User Fetched Successfully',
      },
      CREATED: {
        USER: 'Registration User Successfully',
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
    },
  };
}
