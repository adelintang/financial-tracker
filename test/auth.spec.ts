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
  let refreshToken: string;
  const user = {
    email: 'johanthan@gmail.com',
    name: 'johanthan',
    password: 'johanthan123',
    currency: 'IDR',
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
    const foundUser = await authRepository.getUserByEmail(user.email);
    await testRepository.deleteUser(foundUser.id);
  };

  describe('POST /auth/register', () => {
    afterAll(async () => {
      await deletingUser();
    });

    it('should be rejected if request is invalid', async () => {
      const registerUserInvalid = {
        email: 1000,
        name: 'johanthan',
        password: 'johanthan123',
        currency: 'IDR',
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
      expect(response.body.data.email).toBe(registerUser.email);
      expect(response.body.data.name).toBe(registerUser.name);
      expect(response.body.data.currency).toBe(registerUser.currency);
    });

    it('should be rejected if email already used', async () => {
      const registerUser = user;

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerUser);
      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.BAD_REQUEST.EMAIL);
    });
  });

  // describe('POST /auth/login', () => {
  //   beforeAll(async () => {
  //     await creatingUser();
  //   });

  //   afterAll(async () => {
  //     await deletingUser();
  //   });

  //   it('should be rejected if request is invalid', async () => {
  //     const loginUserInvalid = {
  //       username: '',
  //       password: 1000,
  //     };

  //     const response = await request(app.getHttpServer())
  //       .post('/auth/login')
  //       .send(loginUserInvalid);
  //     expect(response.status).toBe(400);
  //     expect(response.body.error).toBeDefined();
  //   });

  //   it('should be rejected if credentials is wrong', async () => {
  //     const loginUserWrong = {
  //       email: `${user.email}ie`,
  //       password: `${user.password}4`,
  //     };

  //     const response = await request(app.getHttpServer())
  //       .post('/auth/login')
  //       .send(loginUserWrong);
  //     expect(response.status).toBe(400);
  //     expect(response.body.error).toBeDefined();
  //     expect(response.body.message).toBe(
  //       Const.MESSAGE.ERROR.BAD_REQUEST.INVALID_CREDENTIALS,
  //     );
  //   });

  //   it('should be able to login user', async () => {
  //     const loginUser = {
  //       email: user.email,
  //       password: user.password,
  //     };

  //     const response = await request(app.getHttpServer())
  //       .post('/auth/login')
  //       .send(loginUser);
  //     expect(response.status).toBe(201);
  //     expect(response.body.data.accessToken).toBeDefined();
  //     expect(response.body.message).toBe(Const.MESSAGE.SUCCESS.AUTH.LOGIN);
  //     expect(response.headers['set-cookie']).toBeDefined();

  //     refreshToken = response.headers['set-cookie'];
  //   });
  // });

  // describe('POST /auth/refresh-token', () => {
  //   beforeAll(async () => {
  //     await creatingUser();
  //   });

  //   afterAll(async () => {
  //     await deletingUser();
  //   });

  //   it('should be rejected if refreshToken is undefined or invalid payload', async () => {
  //     const response = await request(app.getHttpServer())
  //       .post('/auth/refresh-token')
  //       .set('Cookie', '');

  //     expect(response.status).toBe(401);
  //     expect(response.body.error).toBeDefined();
  //     expect(response.body.message).toBe(Const.MESSAGE.ERROR.AUTH.NO_TOKEN);
  //   });

  //   it('should be rejected if refreshToken expired', async () => {
  //     const expiredRefreshToken =
  //       'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YzQzOTRmNy1kM2UzLTQ4ZDEtOGE2NS1lNDMyNGZhNzE0MmQiLCJyb2xlIjoiU0VMTEVSIiwiaWF0IjoxNzM0NDM5NDMzLCJleHAiOjE3MzQ0Mzk0NDN9.Cb8cQdH94fb2ouXifrv9SJt8CD-xcMF9ARCMxnD39Dw; Max-Age=604800; Path=/; Expires=Tue, 24 Dec 2024 12:43:53 GMT; HttpOnly; SameSite=Strict';

  //     const response = await request(app.getHttpServer())
  //       .post('/auth/refresh-token')
  //       .set('Cookie', expiredRefreshToken);

  //     expect(response.status).toBe(401);
  //     expect(response.body.error).toBeDefined();
  //     expect(response.body.message).toBe(
  //       Const.MESSAGE.ERROR.AUTH.EXPIRED_TOKEN,
  //     );
  //   });

  //   it('should be rejected if refreshToken invalid', async () => {
  //     const response = await request(app.getHttpServer())
  //       .post('/auth/refresh-token')
  //       .set('Cookie', refreshToken[0].replace(/(?<=refreshToken=)[^;]/g, 'b'));

  //     expect(response.status).toBe(401);
  //     expect(response.body.error).toBeDefined();
  //     expect(response.body.message).toBe(
  //       Const.MESSAGE.ERROR.AUTH.INVALID_TOKEN,
  //     );
  //   });

  //   it('should be able to get new access token', async () => {
  //     const response = await request(app.getHttpServer())
  //       .post('/auth/refresh-token')
  //       .set('Cookie', refreshToken);
  //     expect(response.status).toBe(201);
  //     expect(response.body.message).toBe(
  //       Const.MESSAGE.SUCCESS.AUTH.ACCESS_TOKEN,
  //     );
  //     expect(response.body.data.accessToken).toBeDefined();
  //   });
  // });

  // describe('DELETE /auth/logout', () => {
  //   beforeAll(async () => {
  //     await creatingUser();
  //   });

  //   afterAll(async () => {
  //     await deletingUser();
  //   });

  //   it('should be able to logout user', async () => {
  //     const response = await request(app.getHttpServer())
  //       .delete('/auth/logout')
  //       .set('Cookie', refreshToken);
  //     expect(response.status).toBe(204);
  //   });

  //   it('should be able to logout user, even though there are no cookies', async () => {
  //     const response = await request(app.getHttpServer())
  //       .delete('/auth/logout')
  //       .set('Cookie', '');
  //     expect(response.status).toBe(204);
  //   });
  // });
});
