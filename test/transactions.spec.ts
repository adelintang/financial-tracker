import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TestRepository } from './module/test.repository';
import { Const } from '../src/common/constans';
import { TestModule } from './module/test.module';
import { users } from './prisma/data';

describe('Transactions Controller', () => {
  let app: INestApplication;
  let testRepository: TestRepository;
  let accessToken: string;
  let transactionId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    testRepository = app.get(TestRepository);
  });

  describe('POST /transactions', () => {
    const transactionBody = {
      type: 'EXPENSE',
      amount: 50000,
      description: 'membeli gula 1kg',
      userId: 'user-hdh77-hdh666',
      categoryId: 1,
    };

    it('should be rejected if accessToken not provide', async () => {
      const response = await request(app.getHttpServer()).post('/transactions');
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.AUTH.NO_TOKEN);
    });

    it('should be rejected if body request unexpected', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: users[0].email, password: users[0].password });
      accessToken = loginResponse.body.data.accessToken;

      const response = await request(app.getHttpServer())
        .post('/transactions')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          ...transactionBody,
          amount: `${transactionBody.amount}`,
        });
      expect(response.status).toBe(400);
    });

    it('should be rejected if user id and category id not found', async () => {
      const response = await request(app.getHttpServer())
        .post('/transactions')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(transactionBody);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.NOT_FOUND.USER);
    });

    it('should be able to create transaction', async () => {
      const usersResponse = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${accessToken}`);
      console.log(usersResponse.body);
      const userId = usersResponse.body.data[0].id;

      const response = await request(app.getHttpServer())
        .post('/transactions')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          ...transactionBody,
          userId,
        });
      expect(response.status).toBe(201);
      expect(response.body.message).toBe(
        Const.MESSAGE.SUCCESS.CREATED.TRANSACTION,
      );
      expect(response.body.data).toBeDefined();
    });
  });
});
