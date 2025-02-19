import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TestModule } from './module/test.module';
import { TestRepository } from './module/test.repository';
import { Const } from '../src/common/constans';
import { users } from './prisma/data';

describe('Investment Type Controller', () => {
  let app: INestApplication;
  let testRepository: TestRepository;
  let investmentTypeId: number;
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
    await testRepository.deleteInvestmentType(investmentTypeId);
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
        email: users[1].email,
        password: users[1].password,
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
        .send({ email: users[0].email, password: users[0].password });
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

  describe('GET /investment-types', () => {
    it('should be rejected if accessToken not provide', async () => {
      const response = await request(app.getHttpServer()).get(
        '/investment-types',
      );
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.AUTH.NO_TOKEN);
    });

    it('should be able to get investment types', async () => {
      const response = await request(app.getHttpServer())
        .get('/investment-types')
        .set('Authorization', `Bearer ${accessToken}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        Const.MESSAGE.SUCCESS.GET.INVESTMENT_TYPES,
      );
      expect(response.body.data).toBeDefined();
    });

    it('should be able to get investment types with query', async () => {
      const response = await request(app.getHttpServer())
        .get('/investment-types')
        .set('Authorization', `Bearer ${accessToken}`)
        .query({ search: 'stocks' });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        Const.MESSAGE.SUCCESS.GET.INVESTMENT_TYPES,
      );
      expect(response.body.data).toBeDefined();
      expect(response.body.data).toHaveLength(1);
    });
  });
});
