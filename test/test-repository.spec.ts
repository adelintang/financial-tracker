import { Test, TestingModule } from '@nestjs/testing';
import { Currency, Role, User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../src/common/providers/prisma/prisma.service';
import { TestRepository } from './module/test.repository';
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
      {
        id: `user-${uuidv4()}`,
        email: 'test1@gmail.com',
        name: 'test1',
        password: 'test1234',
        currency: Currency.IDR,
        role: Role.USER,
      },
      {
        id: `user-${uuidv4()}`,
        email: 'test2@gmail.com',
        name: 'test2',
        password: 'test1234',
        currency: Currency.IDR,
        role: Role.USER,
      },
    ];

    jest.spyOn(prisma.user, 'createMany').mockResolvedValue({ count: 2 }); // Mock Prisma

    const result = await testRepository.registerMany(users as User[]);
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
      where: { name: { startsWith: 'test' } },
    });
  });
});
