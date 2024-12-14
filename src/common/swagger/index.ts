import { Const } from '../constans';

export class IExampleResponse {
  status: 'Success' | 'Error';
  message: string;
  data: any;
  meta?: any;
}

export class ExampleResponse {
  static REGISTER: IExampleResponse = {
    status: 'Success',
    message: Const.MESSAGE.SUCCESS.AUTH.LOGIN,
    data: {
      id: '5c4394f7-d3e3-48d1-8a65-e4324fa7141e',
      username: 'johndoe',
      role: 'SELLER',
    },
  };
}
