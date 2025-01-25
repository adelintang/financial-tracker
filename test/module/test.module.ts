import { Module } from '@nestjs/common';
import { TestRepository } from './test.repository';
import { PrismaModule } from '../../src/common/providers/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TestRepository],
  exports: [TestRepository],
})
export class TestModule {}
