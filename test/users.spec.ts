import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { AppModule } from './../src/app.module';
import { TestRepository } from './module/test.repository';
import { TestModule } from './module/test.module';
import { Const } from '../src/common/constans';
import { Currency, Role, User } from '@prisma/client';

describe('Users Controller', () => {
  let app: INestApplication;
  let testRepository: TestRepository;
  let accessToken: string;
  const users = [
    {
      id: `user-${uuidv4()}`,
      email: 'test1@gmail.com',
      name: 'test1',
      password: 'test1234',
      currency: Currency.IDR,
      role: Role.ADMIN,
    },
    {
      id: `user-${uuidv4()}`,
      email: 'test2@gmail.com',
      name: 'test2',
      password: 'test1234',
      currency: Currency.IDR,
      role: Role.USER,
    },
  ];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    testRepository = app.get(TestRepository);
  });

  const creatingUsers = async () => {
    const usersData = users.map((user) => {
      const passwordHash = bcrypt.hashSync(user.password, 10);
      return {
        ...user,
        password: passwordHash,
      };
    });
    await testRepository.registerMany(usersData as User[]);
  };

  const deletingUsers = async () => {
    await testRepository.deleteManyUser('test');
  };

  describe('GET /users', () => {
    beforeAll(async () => {
      await creatingUsers();
    });

    afterAll(async () => {
      await deletingUsers();
    });

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
        .query({ search: 'test' })
        .set('Authorization', `Bearer ${accessToken}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(Const.MESSAGE.SUCCESS.GET.USERS);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.length).toBe(2);
      expect(response.body.meta).toBeDefined();
    });
  });

  describe('GET /users/:id', () => {
    beforeAll(async () => {
      await creatingUsers();
    });

    afterAll(async () => {
      await deletingUsers();
    });

    it('should be rejected if accessToken not provide', async () => {
      const response = await request(app.getHttpServer()).get(
        '/users/random-id',
      );

      expect(response.status).toBe(401);
    });

    it('should be able to get user by id', async () => {
      const usersResponse = await request(app.getHttpServer())
        .get('/users')
        .query({ search: 'test' })
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
