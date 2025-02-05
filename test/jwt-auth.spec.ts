import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthRepository } from '../src/modules/auth/repository/auth.repository';
import { TestModule } from './module/test.module';
import { AuthModule } from '../src/modules/auth/auth.module';
import { TestRepository } from './module/test.repository';
import { RegisterAuthDto } from '../src/modules/auth/dto/register-auth.dto';
import { Const } from '../src/common/constans';

describe('Jwt Auth Guard', () => {
  let app: INestApplication;
  let authRepository: AuthRepository;
  let testRepository: TestRepository;
  let accessToken: string;
  const user = {
    username: 'johanthan',
    password: 'johanthan123',
    role: 'SELLER',
  };

  const creatingUser = async () => {
    const passwordHash = await bcrypt.hash(user.password, 10);
    const registerUser = { ...user, password: passwordHash };
    await authRepository.register(registerUser as RegisterAuthDto);
  };

  const deletingUser = async () => {
    const foundUser = await authRepository.getUserByUsername(user.username);
    await testRepository.deleteUser(foundUser.id);
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    authRepository = app.get(AuthRepository);
    testRepository = app.get(TestRepository);

    await creatingUser();
  });

  afterAll(async () => {
    await deletingUser();
  });

  describe('check auth guard - GET /users', () => {
    it('should be rejected if token not provided', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', '');

      expect(response.status).toBe(401);
      expect(response.body.error).toBeDefined();
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.AUTH.NO_TOKEN);
    });

    it('should be rejected if token invalid', async () => {
      const userRequest = {
        username: user.username,
        password: user.password,
      };

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send(userRequest);
      accessToken = loginResponse.body.data.accessToken;

      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${accessToken.slice(0, -1)}`);

      expect(response.status).toBe(401);
      expect(response.body.error).toBeDefined();
      expect(response.body.message).toBe(
        Const.MESSAGE.ERROR.AUTH.INVALID_TOKEN,
      );
    });

    it('should be rejected if token expired', async () => {
      const expiredToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YzQzOTRmNy1kM2UzLTQ4ZDEtOGE2NS1lNDMyNGZhNzE0MmQiLCJyb2xlIjoiU0VMTEVSIiwiaWF0IjoxNzM0NDMxOTgxLCJleHAiOjE3MzQ0MzE5OTF9.8sKtU3ad--wuRImJ-aAz2WRINAx3ESfJU02gzzfD7nA';
      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${expiredToken}`);

      expect(response.status).toBe(401);
      expect(response.body.error).toBeDefined();
      expect(response.body.message).toBe(
        Const.MESSAGE.ERROR.AUTH.EXPIRED_TOKEN,
      );
    });

    it('should be able to get users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${accessToken}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(Const.MESSAGE.SUCCESS.GET.USERS);
      expect(response.body.data).toBeDefined();
    });
  });
});
