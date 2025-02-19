import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Const } from '../src/common/constans';
import { users } from './prisma/seed';

describe('Users Controller', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('GET /users', () => {
    it('should be rejected if accessToken not provide', async () => {
      const response = await request(app.getHttpServer()).get('/users');
      expect(response.status).toBe(401);
    });

    it('should be able to get users', async () => {
      const loginUser = {
        email: users[0].email,
        password: users[0].password,
      };

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginUser);
      accessToken = loginResponse.body.data.accessToken;

      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${accessToken}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(Const.MESSAGE.SUCCESS.GET.USERS);
      expect(response.body.data).toBeDefined();
      expect(response.body.meta).toBeDefined();
    });

    it('should be able to get users with query search by username', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .query({ search: users[1].name })
        .set('Authorization', `Bearer ${accessToken}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(Const.MESSAGE.SUCCESS.GET.USERS);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.length).toBe(1);
      expect(response.body.meta).toBeDefined();
    });
  });

  describe('GET /users/:id', () => {
    it('should be rejected if accessToken not provide', async () => {
      const response = await request(app.getHttpServer()).get(
        '/users/random-id',
      );

      expect(response.status).toBe(401);
    });

    it('should be able to get user by id', async () => {
      const usersResponse = await request(app.getHttpServer())
        .get('/users')
        .query({ search: users[1].name })
        .set('Authorization', `Bearer ${accessToken}`);
      const response = await request(app.getHttpServer())
        .get(`/users/${usersResponse.body.data[0].id}`)
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(Const.MESSAGE.SUCCESS.GET.USER);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBe(usersResponse.body.data[0].id);
    });

    it('should be rejected if user not found', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/random-id')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.NOT_FOUND.USER);
    });
  });
});
