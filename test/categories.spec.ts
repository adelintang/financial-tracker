import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TransactionType } from '@prisma/client';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from '../src/modules/auth/repository/auth.repository';
import { TestRepository } from './module/test.repository';
import { AppModule } from '../src/app.module';
import { AuthModule } from '../src/modules/auth/auth.module';
import { RegisterAuthDto } from '../src/modules/auth/dto/register-auth.dto';
import { TestModule } from './module/test.module';
import { Const } from '../src/common/constans';

describe('Categories Controller', () => {
  let app: INestApplication;
  let authRepository: AuthRepository;
  let testRepository: TestRepository;
  let categoryId: number;
  const admin = {
    email: 'akounpes12@gmail.com',
    password: 'akounpes12',
  };
  const user = {
    email: 'johanthan@gmail.com',
    name: 'johanthan',
    password: 'johanthan123',
    currency: 'IDR',
  };

  const creatingUser = async () => {
    const passwordHash = await bcrypt.hash(user.password, 10);
    const registerUser = { ...user, password: passwordHash };
    await authRepository.register(registerUser as RegisterAuthDto);
  };

  const deletingUser = async () => {
    const foundUser = await authRepository.getUserByEmail(user.email);
    await testRepository.deleteUser(foundUser.id);
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    authRepository = app.get(AuthRepository);
    testRepository = app.get(TestRepository);

    await creatingUser();
  });

  afterAll(async () => {
    await testRepository.deleteCategory(categoryId);
    await deletingUser();
  });

  describe('POST /categories', () => {
    const categoryBody = {
      name: 'Alat Mandi',
      type: TransactionType.EXPENSE,
    };

    it('should be rejected if accessToken not provide', async () => {
      const response = await request(app.getHttpServer())
        .post('/categories')
        .send(categoryBody);
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.AUTH.NO_TOKEN);
    });

    it('should be rejected if role not admin', async () => {
      const loginBody = {
        email: user.email,
        password: user.password,
      };
      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginBody);

      const response = await request(app.getHttpServer())
        .post('/categories')
        .set(
          'Authorization',
          `Bearer ${loginResponse?.body?.data?.accessToken}`,
        )
        .send(categoryBody);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.FORBIDDEN.ROLE);
    });

    it('should be able to create category', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send(admin);
      const response = await request(app.getHttpServer())
        .post('/categories')
        .set(
          'Authorization',
          `Bearer ${loginResponse?.body?.data?.accessToken}`,
        )
        .send(categoryBody);
      categoryId = response.body.data.id;

      expect(response.status).toBe(201);
      expect(response.body.message).toBe(
        Const.MESSAGE.SUCCESS.CREATED.CATEGORY,
      );
      expect(response.body.data).toBeDefined();
    });
  });
});
