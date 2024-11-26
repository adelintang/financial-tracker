import { Injectable } from '@nestjs/common';
import { Utils } from './common/utils';

@Injectable()
export class AppService {
  getHello() {
    return Utils.Response('Success', 'Hello World!', null);
  }
}
