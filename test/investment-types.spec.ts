import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';
import { TestRepository } from './module/test.repository';
import { AuthRepository } from '../src/modules/auth/repository/auth.repository';
import { AppModule } from '../src/app.module';
import { AuthModule } from '../src/modules/auth/auth.module';
import { TestModule } from './module/test.module';
import { RegisterAuthDto } from '../src/modules/auth/dto/register-auth.dto';
import { Const } from '../src/common/constans';

describe('Investment Type Controller', () => {
  let app: INestApplication;
  let authRepository: AuthRepository;
  let testRepository: TestRepository;
  let investmentTypeId: number;
  let accessToken: string;
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
    await testRepository.deleteInvestmentType(investmentTypeId);
    await deletingUser();
  });

  describe('POST /investment-types', () => {
    const investmentTypeBody = {
      type: 'Stocks',
    };

    it('should be rejected if accessToken not provide', async () => {
      const response = await request(app.getHttpServer())
        .post('/investment-types')
        .send(investmentTypeBody);
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
        .post('/investment-types')
        .set(
          'Authorization',
          `Bearer ${loginResponse?.body?.data?.accessToken}`,
        )
        .send(investmentTypeBody);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.FORBIDDEN.ROLE);
    });

    it('should be rejected if body request unexpected', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send(admin);
      accessToken = loginResponse.body.data.accessToken;

      const response = await request(app.getHttpServer())
        .post('/investment-types')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ type: 1 });
      expect(response.status).toBe(400);
    });

    it('should be able to create investment type', async () => {
      const response = await request(app.getHttpServer())
        .post('/investment-types')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(investmentTypeBody);
      investmentTypeId = response.body.data.id;

      expect(response.status).toBe(201);
      expect(response.body.message).toBe(
        Const.MESSAGE.SUCCESS.CREATED.INVESTMENT_TYPE,
      );
      expect(response.body.data).toBeDefined();
    });

    it('should be rejected if name is already', async () => {
      const response = await request(app.getHttpServer())
        .post('/investment-types')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(investmentTypeBody);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        Const.MESSAGE.ERROR.BAD_REQUEST.INVESTMENT_TYPE,
      );
    });
  });
});
