import { Module } from '@nestjs/common';
import { TestRepository } from './test.repositry';

@Module({
  providers: [TestRepository],
  exports: [TestRepository],
})
export class TestModule {}
