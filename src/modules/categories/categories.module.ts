import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './repository/categories.repository';
import { PrismaModule } from '../../common/providers/prisma/prisma.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
  imports: [PrismaModule],
})
export class CategoriesModule {}
