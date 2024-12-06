import { Module } from '@nestjs/common';
import { TestRepository } from './test.repository';

@Module({
  providers: [TestRepository],
  exports: [TestRepository],
})
export class TestModule {}
