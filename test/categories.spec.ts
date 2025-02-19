import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TransactionType } from '@prisma/client';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TestRepository } from './module/test.repository';
import { TestModule } from './module/test.module';
import { Const } from '../src/common/constans';
import { users } from './prisma/data';

describe('Categories Controller', () => {
  let app: INestApplication;
  let testRepository: TestRepository;
  let categoryId: number;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    testRepository = app.get(TestRepository);
  });

  afterAll(async () => {
    await testRepository.deleteCategory(categoryId);
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
        email: users[1].email,
        password: users[1].password,
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
        .send({ email: users[0].email, password: users[0].password });
      accessToken = loginResponse.body.data.accessToken;
      const response = await request(app.getHttpServer())
        .post('/categories')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(categoryBody);
      categoryId = response.body.data.id;

      expect(response.status).toBe(201);
      expect(response.body.message).toBe(
        Const.MESSAGE.SUCCESS.CREATED.CATEGORY,
      );
      expect(response.body.data).toBeDefined();
    });

    it('should be rejected if body request unexpected', async () => {
      const response = await request(app.getHttpServer())
        .post('/categories')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: true,
        });
      expect(response.status).toBe(400);
    });

    it('should be rejected if name is already', async () => {
      const response = await request(app.getHttpServer())
        .post('/categories')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(categoryBody);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        Const.MESSAGE.ERROR.BAD_REQUEST.CATEGORY,
      );
    });
  });

  describe('GET /categories', () => {
    it('should be rejected if accessToken not provide', async () => {
      const response = await request(app.getHttpServer()).get('/categories');
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.AUTH.NO_TOKEN);
    });

    it('should be able to get categories', async () => {
      const response = await request(app.getHttpServer())
        .get('/categories')
        .set('Authorization', `Bearer ${accessToken}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(Const.MESSAGE.SUCCESS.GET.CATEGORIES);
      expect(response.body.data).toBeDefined();
    });

    it('should be able to get categories with query', async () => {
      const response = await request(app.getHttpServer())
        .get('/categories')
        .query({ search: 'Alat mandi', type: TransactionType.EXPENSE })
        .set('Authorization', `Bearer ${accessToken}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(Const.MESSAGE.SUCCESS.GET.CATEGORIES);
      expect(response.body.data).toBeDefined();
      expect(response.body.data).toHaveLength(1);
    });
  });
});
