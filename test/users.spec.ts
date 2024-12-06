import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';
import { AppModule } from './../src/app.module';
import { TestRepository } from './module/test.repository';
import { TestModule } from './module/test.module';
import { Const } from '../src/common/constans';
import { RegisterAuthDto } from '../src/modules/auth/dto/register-auth.dto';

describe('Users Controller', () => {
  let app: INestApplication;
  let testRepository: TestRepository;
  const users = [
    {
      username: 'test_johanthan',
      password: 'johanthan123',
      role: 'SELLER',
    },
    {
      username: 'test_krisnha',
      password: 'krisnha123',
      role: 'CONSUMER',
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
    await testRepository.registerMany(usersData as RegisterAuthDto[]);
  };

  const deletingUsers = async () => {
    await testRepository.deleteManyUser('test_');
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
        username: users[0].username,
        password: users[0].password,
      };

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginUser);
      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${loginResponse.body.data.accessToken}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(Const.MESSAGE.SUCCESS.GET.USERS);
      expect(response.body.data).toBeDefined();
      expect(response.body.meta).toBeDefined();
    });

    it('should be able to get users with query search by username', async () => {
      const loginUser = {
        username: users[0].username,
        password: users[0].password,
      };

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginUser);
      const response = await request(app.getHttpServer())
        .get('/users')
        .query({ search: 'test' })
        .set('Authorization', `Bearer ${loginResponse.body.data.accessToken}`);
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
      const loginUser = {
        username: users[0].username,
        password: users[0].password,
      };

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginUser);
      const usersResponse = await request(app.getHttpServer())
        .get('/users')
        .query({ search: 'test' })
        .set('Authorization', `Bearer ${loginResponse.body.data.accessToken}`);
      const response = await request(app.getHttpServer())
        .get(`/users/${usersResponse.body.data[0].id}`)
        .set('Authorization', `Bearer ${loginResponse.body.data.accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(Const.MESSAGE.SUCCESS.GET.USER);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBe(usersResponse.body.data[0].id);
    });

    it('should be rejected if user not found', async () => {
      const loginUser = {
        username: users[0].username,
        password: users[0].password,
      };

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginUser);
      const response = await request(app.getHttpServer())
        .get('/users/random-id')
        .set('Authorization', `Bearer ${loginResponse.body.data.accessToken}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.NOT_FOUND.USER);
    });
  });
});
