import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/common/providers/prisma/prisma.service';
import { TestRepository } from './module/test.repository';
import { RegisterAuthDto } from '../src/modules/auth/dto/register-auth.dto';
import { TestModule } from './module/test.module';

describe('TestRepository', () => {
  let testRepository: TestRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestRepository, PrismaService],
      imports: [TestModule],
    }).compile();

    testRepository = module.get<TestRepository>(TestRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create multiple users', async () => {
    const users = [
      { username: 'test1', password: 'hashedPassword1', role: 'CONSUMER' },
      { username: 'test2', password: 'hashedPassword2', role: 'CONSUMER' },
    ];

    jest.spyOn(prisma.user, 'createMany').mockResolvedValue({ count: 2 }); // Mock Prisma

    const result = await testRepository.registerMany(
      users as RegisterAuthDto[],
    );
    expect(result).toEqual({ count: 2 });
    expect(prisma.user.createMany).toHaveBeenCalledWith({
      data: users,
      skipDuplicates: true,
    });
  });

  it('should delete users by prefix', async () => {
    jest.spyOn(prisma.user, 'deleteMany').mockResolvedValue({ count: 2 }); // Mock Prisma

    const result = await testRepository.deleteManyUser('test');
    expect(result).toEqual({ count: 2 });
    expect(prisma.user.deleteMany).toHaveBeenCalledWith({
      where: { username: { startsWith: 'test' } },
    });
  });
});
