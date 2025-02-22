import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TestRepository } from './module/test.repository';
import { Const } from '../src/common/constans';
import { TestModule } from './module/test.module';
import { users } from './prisma/data';
import { TransactionType } from '@prisma/client';

describe('Transactions Controller', () => {
  let app: INestApplication;
  let testRepository: TestRepository;
  let accessToken: string;
  let accessTokenNotOwned: string;
  let transactionId: string;
  let userId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    testRepository = app.get(TestRepository);
  });

  // afterAll(async () => {
  //   await testRepository.deleteManyTransactions();
  // });

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
      userId = usersResponse.body.data[0].id;

      const response = await request(app.getHttpServer())
        .post('/transactions')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          ...transactionBody,
          userId,
        });
      transactionId = response.body.data.id;
      await request(app.getHttpServer())
        .post('/transactions')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          ...transactionBody,
          type: TransactionType.INCOME,
          description: 'gaji febuari',
          amount: 4000000,
          userId,
        });
      expect(response.status).toBe(201);
      expect(response.body.message).toBe(
        Const.MESSAGE.SUCCESS.CREATED.TRANSACTION,
      );
      expect(response.body.data).toBeDefined();
    });
  });

  describe('GET /transactions/expense', () => {
    it('should be rejected if accessToken not provide', async () => {
      const response = await request(app.getHttpServer()).get(
        '/transactions/expense',
      );
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.AUTH.NO_TOKEN);
    });

    it('should be able to get expense transactions', async () => {
      const response = await request(app.getHttpServer())
        .get('/transactions/expense')
        .set('Authorization', `Bearer ${accessToken}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        Const.MESSAGE.SUCCESS.GET.EXPENSE_TRANSACTIONS,
      );
      expect(response.body.data).toBeDefined();
      expect(response.body.meta).toBeDefined();
    });

    it('should be able to get expense transactions with query', async () => {
      const response = await request(app.getHttpServer())
        .get('/transactions/expense')
        .set('Authorization', `Bearer ${accessToken}`);
      // .query({ search: 'membeli gula' });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        Const.MESSAGE.SUCCESS.GET.EXPENSE_TRANSACTIONS,
      );
      console.log(response.body);
      expect(response.body.data).toBeDefined();
      expect(response.body.data).toHaveLength(1);
      expect(response.body.meta).toBeDefined();
    });
  });

  describe('GET /transactions/income', () => {
    it('should be rejected if accessToken not provide', async () => {
      const response = await request(app.getHttpServer()).get(
        '/transactions/income',
      );
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.AUTH.NO_TOKEN);
    });

    it('should be able to get expense transactions', async () => {
      const response = await request(app.getHttpServer())
        .get('/transactions/income')
        .set('Authorization', `Bearer ${accessToken}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        Const.MESSAGE.SUCCESS.GET.INCOME_TRANSACTIONS,
      );
      expect(response.body.data).toBeDefined();
      expect(response.body.meta).toBeDefined();
    });

    it('should be able to get expense transactions with query', async () => {
      const response = await request(app.getHttpServer())
        .get('/transactions/income')
        .set('Authorization', `Bearer ${accessToken}`)
        .query({ search: 'gaji febuari' });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        Const.MESSAGE.SUCCESS.GET.INCOME_TRANSACTIONS,
      );
      expect(response.body.data).toBeDefined();
      expect(response.body.data).toHaveLength(1);
      expect(response.body.meta).toBeDefined();
    });
  });

  describe('GET /transactions/:transactionId', () => {
    it('should be rejected if accessToken not provide', async () => {
      const response = await request(app.getHttpServer()).get(
        `/transactions/${transactionId}`,
      );
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.AUTH.NO_TOKEN);
    });

    it('should be rejected if transaction not found', async () => {
      const response = await request(app.getHttpServer())
        .get('/transactions/transaction-738db-hdhuuw')
        .set('Authorization', `Bearer ${accessToken}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe(
        Const.MESSAGE.ERROR.NOT_FOUND.TRANSACTION,
      );
    });

    it('should be able to get transaction', async () => {
      const response = await request(app.getHttpServer())
        .get(`/transactions/${transactionId}`)
        .set('Authorization', `Bearer ${accessToken}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(Const.MESSAGE.SUCCESS.GET.TRANSACTION);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('PATCH /transactions/:transactionId', () => {
    it('should be rejected if accessToken not provide', async () => {
      const response = await request(app.getHttpServer()).patch(
        `/transactions/${transactionId}`,
      );
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.AUTH.NO_TOKEN);
    });

    it('should be rejected if transaction not found', async () => {
      const response = await request(app.getHttpServer())
        .patch('/transactions/transaction-738db-hdhuuw')
        .set('Authorization', `Bearer ${accessToken}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe(
        Const.MESSAGE.ERROR.NOT_FOUND.TRANSACTION,
      );
    });

    it('should be rejected if body request unexpected', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/transactions/${transactionId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ amount: '40000' });
      expect(response.status).toBe(400);
    });

    it('should be rejected if user not owned', async () => {
      const usersResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: users[1].email,
          password: users[1].password,
        });
      accessTokenNotOwned = usersResponse?.body?.data?.accessToken;

      const response = await request(app.getHttpServer())
        .patch(`/transactions/${transactionId}`)
        .set('Authorization', `Bearer ${accessTokenNotOwned}`)
        .send({ amount: 40000 });
      expect(response.status).toBe(403);
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.FORBIDDEN.USER);
    });
  });
});
