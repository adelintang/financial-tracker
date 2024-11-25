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
    },
  };
}
