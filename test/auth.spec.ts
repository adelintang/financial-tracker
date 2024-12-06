import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './../src/app.module';
import { AuthModule } from '../src/modules/auth/auth.module';
import { AuthRepository } from '../src/modules/auth/repository/auth.repository';
import { TestRepository } from './module/test.repository';
import { TestModule } from './module/test.module';
import { Const } from '../src/common/constans';
import { RegisterAuthDto } from '../src/modules/auth/dto/register-auth.dto';

describe('Auth Controller', () => {
  let app: INestApplication;
  let authRepository: AuthRepository;
  let testRepository: TestRepository;
  const user = {
    username: 'johanthan',
    password: 'johanthan123',
    role: 'SELLER',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    await app.init();

    authRepository = app.get(AuthRepository);
    testRepository = app.get(TestRepository);
  });

  const creatingUser = async () => {
    const passwordHash = await bcrypt.hash(user.password, 10);
    const registerUser = { ...user, password: passwordHash };
    await authRepository.register(registerUser as RegisterAuthDto);
  };

  const deletingUser = async () => {
    const foundUser = await authRepository.getUserByUsername(user.username);
    await testRepository.deleteUser(foundUser.id);
  };

  describe('POST /auth/register', () => {
    afterAll(async () => {
      await deletingUser();
    });

    it('should be rejected if request is invalid', async () => {
      const registerUserInvalid = {
        username: 1000,
        password: '',
        role: 'CONSUMER',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerUserInvalid);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it('should be able to registration user', async () => {
      const registerUser = user;

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerUser);
      expect(response.status).toBe(201);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.username).toBe(registerUser.username);
      expect(response.body.data.role).toBe(registerUser.role);
    });

    it('should be rejected if username already used', async () => {
      const registerUser = user;

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerUser);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
      expect(response.body.message).toBe(
        Const.MESSAGE.ERROR.BAD_REQUEST.USERNAME,
      );
    });
  });

  describe('POST /auth/login', () => {
    beforeAll(async () => {
      await creatingUser();
    });

    afterAll(async () => {
      await deletingUser();
    });

    it('should be rejected if request is invalid', async () => {
      const loginUserInvalid = {
        username: '',
        password: 1000,
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginUserInvalid);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it('should be rejected if credentials is wrong', async () => {
      const loginUserWrong = {
        username: `${user.username}ie`,
        password: `${user.password}4`,
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginUserWrong);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
      expect(response.body.message).toBe(
        Const.MESSAGE.ERROR.BAD_REQUEST.INVALID_CREDENTIALS,
      );
    });

    it('should be able to login user', async () => {
      const loginUser = {
        username: user.username,
        password: user.password,
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginUser);
      expect(response.status).toBe(201);
      expect(response.body.data.accessToken).toBeDefined();
      expect(response.body.message).toBe(Const.MESSAGE.SUCCESS.AUTH.LOGIN);
      expect(response.headers['set-cookie']).toBeDefined();
    });
  });

  describe('POST /auth/refresh-token', () => {
    beforeAll(async () => {
      await creatingUser();
    });

    afterAll(async () => {
      await deletingUser();
    });

    it('should be rejected if refreshToken is undefined or invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/refresh-token')
        .set('Cookie', '');

      expect(response.status).toBe(401);
      expect(response.body.error).toBeDefined();
    });

    it('should be able to get new access token', async () => {
      const loginUser = {
        username: user.username,
        password: user.password,
      };

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginUser);

      const response = await request(app.getHttpServer())
        .post('/auth/refresh-token')
        .set('Cookie', loginResponse.headers['set-cookie']);
      expect(response.status).toBe(201);
      expect(response.body.data.accessToken).toBeDefined();
    });
  });

  describe('DELETE /auth/logout', () => {
    beforeAll(async () => {
      await creatingUser();
    });

    afterAll(async () => {
      await deletingUser();
    });

    it('should be able to logout user', async () => {
      const loginUser = {
        username: user.username,
        password: user.password,
      };

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginUser);

      const response = await request(app.getHttpServer())
        .delete('/auth/logout')
        .set('Cookie', loginResponse.headers['set-cookie']);
      expect(response.status).toBe(204);
    });

    it('should be able to logout user, even though there are no cookies', async () => {
      const response = await request(app.getHttpServer())
        .delete('/auth/logout')
        .set('Cookie', '');
      expect(response.status).toBe(204);
    });
  });
});
