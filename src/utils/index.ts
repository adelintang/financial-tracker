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

  static MetaPagination(
    page: number,
    perPage: number,
    totalCurrentPage: number,
    total: number,
  ) {
    return {
      currentPage: page,
      perPage,
      totalCurrentPage,
      totalPage: Math.ceil(total / perPage),
      totalData: total,
    };
  }
}
