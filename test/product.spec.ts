import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestRepository } from './module/test.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { TestModule } from './module/test.module';
import { AppModule } from '../src/app.module';
import { AuthModule } from '../src/modules/auth/auth.module';
import { AuthRepository } from '../src/modules/auth/repository/auth.repository';
import { RegisterAuthDto } from '../src/modules/auth/dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { ProductsRepository } from '../src/modules/products/repository/products.repository';
import { ProductsModule } from '../src/modules/products/products.module';
import { Const } from '../src/common/constans';
import { Product } from '@prisma/client';

describe('Product Controller', () => {
  let app: INestApplication;
  let authRepository: AuthRepository;
  let productRepository: ProductsRepository;
  let testRepository: TestRepository;
  let user_id: string;
  let accessToken: string;
  let product: Product;
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

  const creatingUsers = async () => {
    const usersData = users.map((user) => {
      const passwordHash = bcrypt.hashSync(user.password, 10);
      return {
        ...user,
        password: passwordHash,
      };
    });
    await testRepository.registerMany(usersData as RegisterAuthDto[]);
    const result = await authRepository.getUserByUsername(users[0].username);
    user_id = result.id;
  };

  const deletingUsers = async () => {
    await testRepository.deleteManyUser('test_');
  };

  const deleteProduct = async (name: string) => {
    const foundProduct = await productRepository.productAlreadyUsed(name);
    await productRepository.deleteProduct(foundProduct.id);
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthModule, ProductsModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    authRepository = app.get(AuthRepository);
    productRepository = app.get(ProductsRepository);
    testRepository = app.get(TestRepository);

    await creatingUsers();
  });

  afterAll(async () => {
    await deleteProduct('test product');
    await deletingUsers();
  });

  describe('POST /products', () => {
    it('should be rejected if token not provided', async () => {
      const product = {
        name: 'test product',
        desc: 'test product description',
        price: 1000,
        qty: 20,
        user_id,
      };

      const response = await request(app.getHttpServer())
        .post('/products')
        .set('Authorization', '')
        .send(product);
      expect(response.status).toBe(401);
      expect(response.body.message).toBeDefined();
    });

    it('should be rejected if request invalid', async () => {
      const loginUser = {
        username: users[0].username,
        password: users[0].password,
      };
      const product = {
        name: '',
        desc: true,
        price: 1000,
        qty: 20,
        user_id,
      };

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginUser);
      accessToken = loginResponse.body.data.accessToken;

      const response = await request(app.getHttpServer())
        .post('/products')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(product);
      expect(response.status).toBe(400);
      expect(response.body.message).toBeDefined();
    });

    it('should be able to create product', async () => {
      const productRequest = {
        name: 'test product',
        desc: 'test product description',
        price: 1000,
        qty: 20,
        user_id,
      };

      const response = await request(app.getHttpServer())
        .post('/products')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(productRequest);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe(Const.MESSAGE.SUCCESS.CREATED.PRODUCT);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.name).toBe(productRequest.name);
      expect(response.body.data.desc).toBe(productRequest.desc);
      expect(response.body.data.price).toBe(productRequest.price);
      expect(response.body.data.qty).toBe(productRequest.qty);
      expect(response.body.data.user_id).toBe(productRequest.user_id);
      product = response.body.data;
    });
  });

  describe('GET /products', () => {
    it('should be rejected if token not provided', async () => {
      const response = await request(app.getHttpServer())
        .get('/products')
        .set('Authorization', '');
      expect(response.status).toBe(401);
      expect(response.body.message).toBeDefined();
    });

    it('should be able to get users', async () => {
      const response = await request(app.getHttpServer())
        .get('/products')
        .set('Authorization', `Bearer ${accessToken}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(Const.MESSAGE.SUCCESS.GET.PRODUCTS);
      expect(response.body.data).toBeDefined();
      expect(response.body.meta).toBeDefined();
    });

    it('should be able to get users with query search by product name', async () => {
      const response = await request(app.getHttpServer())
        .get('/products')
        .query({ search: 'test' })
        .set('Authorization', `Bearer ${accessToken}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(Const.MESSAGE.SUCCESS.GET.PRODUCTS);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.length).toBe(1);
      expect(response.body.data[0].id).toBe(product.id);
      expect(response.body.data[0].name).toBe(product.name);
      expect(response.body.data[0].desc).toBe(product.desc);
      expect(response.body.data[0].price).toBe(product.price);
      expect(response.body.data[0].qty).toBe(product.qty);
      expect(response.body.data[0].user.id).toBe(product.user_id);
      expect(response.body.meta).toBeDefined();
    });
  });
});
