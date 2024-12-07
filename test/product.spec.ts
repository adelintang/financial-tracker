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

describe('Product Controller', () => {
  let app: INestApplication;
  let authRepository: AuthRepository;
  let productRepository: ProductsRepository;
  let testRepository: TestRepository;
  let user_id: string;
  let accessToken: string;
  const user = {
    username: 'test_johanthan',
    password: 'johanthan123',
    role: 'SELLER',
  };

  const creatingUser = async () => {
    const passwordHash = await bcrypt.hash(user.password, 10);
    const registerUser = { ...user, password: passwordHash };
    const result = await authRepository.register(
      registerUser as RegisterAuthDto,
    );
    user_id = result.id;
  };

  const deletingUser = async () => {
    const foundUser = await authRepository.getUserByUsername(user.username);
    await testRepository.deleteUser(foundUser.id);
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

    await creatingUser();
  });

  afterAll(async () => {
    await deletingUser();
  });

  describe('POST /products', () => {
    afterAll(async () => {
      deleteProduct('test product');
    });

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
        username: user.username,
        password: user.password,
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
      const product = {
        name: 'test product',
        desc: 'test product description',
        price: 1000,
        qty: 20,
        user_id,
      };

      const response = await request(app.getHttpServer())
        .post('/products')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(product);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe(Const.MESSAGE.SUCCESS.CREATED.PRODUCT);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.name).toBe(product.name);
      expect(response.body.data.desc).toBe(product.desc);
      expect(response.body.data.price).toBe(product.price);
      expect(response.body.data.qty).toBe(product.qty);
      expect(response.body.data.user_id).toBe(product.user_id);
    });
  });
});
