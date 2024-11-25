import { Injectable } from '@nestjs/common';
import { Utils } from './utils';

@Injectable()
export class AppService {
  getHello() {
    return Utils.Response('Success', 'Hello World!', null);
  }
}
