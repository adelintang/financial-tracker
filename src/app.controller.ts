import { Controller, Get } from '@nestjs/common';
import { Utils } from './common/utils';

@Controller('/')
export class AppController {
  @Get()
  welcome() {
    return Utils.Response('Success', 'Welcome To Financial Tracker API', null);
  }
}
