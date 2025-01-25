import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { TestRepository } from './module/test.repository';
import { RegisterAuthDto } from '../src/app/auth/dto/register-auth.dto';
import { AuthRepository } from '../src/app/auth/repository/auth.repository';
import { ProductsRepository } from '../src/app/products/repository/products.repository';
import { AppModule } from '../src/app.module';
import { AuthModule } from '../src/app/auth/auth.module';
import { ProductsModule } from '../src/app/products/products.module';
import * as path from 'path';
import { TestModule } from './module/test.module';
import { Const } from '../src/common/constans';

describe('Product Image Controller', () => {
  let app: INestApplication;
  let authRepository: AuthRepository;
  let productRepository: ProductsRepository;
  let testRepository: TestRepository;
  let accessToken: string;
  let accessTokenInvalidRole: string;
  let accessTokenNotOwned: string;
  let user_id: string;
  let product_id: string;
  let product_image_id: string;
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
    {
      username: 'test_burhan',
      password: 'burhan123',
      role: 'SELLER',
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

  const createProduct = async () => {
    const result = await productRepository.createProduct({
      name: 'test product',
      desc: 'test product description',
      price: 10000,
      qty: 10,
      user_id,
    });

    product_id = result.id;
  };

  const deleteProduct = async (id: string) => {
    await productRepository.deleteProduct(id);
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
    await createProduct();
  });

  afterAll(async () => {
    await deleteProduct(product_id);
    await deletingUsers();

    await app.close();
  });

  describe('POST /products-image/:productId/upload', () => {
    it('should join paths correctly', () => {
      const filePath = path.join(__dirname, 'files', 'valid-file.jpg');
      expect(filePath).toBe(path.resolve(__dirname, 'files', 'valid-file.jpg'));
    });

    it('should be rejected if token not provided', async () => {
      const response = await request(app.getHttpServer())
        .post(`/products-image/${product_id}/upload`)
        .set('Authorization', '');
      expect(response.status).toBe(401);
      expect(response.body.message).toBeDefined();
    });

    it('should be rejected if request invalid file type', async () => {
      const user = {
        username: users[0].username,
        password: users[0].password,
      };

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);
      accessToken = loginResponse.body.data.accessToken;

      const filePath = path.resolve(__dirname, 'files', 'invalid-type.txt');
      const filename = path.basename(filePath);
      const file = Buffer.from(filePath, 'utf8');
      const response = await request(app.getHttpServer())
        .post(`/products-image/${product_id}/upload`)
        .set('Authorization', `Bearer ${accessToken}`)
        .field('file', file)
        .attach('file', file, {
          filename,
        });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        Const.MESSAGE.ERROR.BAD_REQUEST.INVALID_FILE_TYPE,
      );
    });

    it('should be rejected if request invalid when file to large', async () => {
      const filePath = path.resolve(__dirname, 'files', 'to-large-file.jpg');

      const response = await request(app.getHttpServer())
        .post(`/products-image/${product_id}/upload`)
        .set('Authorization', `Bearer ${accessToken}`)
        .timeout(15000)
        .field('file', filePath)
        .attach('file', filePath);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        Const.MESSAGE.ERROR.BAD_REQUEST.INVALID_FILE_SIZE,
      );
    });

    it('should be rejected if request product id not found', async () => {
      const filePath = path.resolve(__dirname, 'files', 'valid-file.jpg');

      const response = await request(app.getHttpServer())
        .post('/products-image/random-id/upload')
        .set('Authorization', `Bearer ${accessToken}`)
        .timeout(15000)
        .field('file', filePath)
        .attach('file', filePath);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.NOT_FOUND.PRODUCT);
    });

    it('should be rejected if user have not role', async () => {
      const user = {
        username: users[1].username,
        password: users[1].password,
      };

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);
      accessTokenInvalidRole = loginResponse.body.data.accessToken;

      const filePath = path.resolve(__dirname, 'files', 'valid-file.jpg');
      const filename = path.basename(filePath);
      const file = Buffer.from(filePath, 'utf8');
      const response = await request(app.getHttpServer())
        .post(`/products-image/${product_id}/upload`)
        .set('Authorization', `Bearer ${accessTokenInvalidRole}`)
        .timeout(15000)
        .field('file', file)
        .attach('file', file, { filename });
      expect(response.status).toBe(403);
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.FORBIDDEN.ROLE);
    });

    it('should be rejected if user not owned', async () => {
      const user = {
        username: users[2].username,
        password: users[2].password,
      };

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user);
      accessTokenNotOwned = loginResponse.body.data.accessToken;

      const filePath = path.resolve(__dirname, 'files', 'valid-file.jpg');
      const filename = path.basename(filePath);
      const file = Buffer.from(filePath, 'utf8');
      const response = await request(app.getHttpServer())
        .post(`/products-image/${product_id}/upload`)
        .set('Authorization', `Bearer ${accessTokenNotOwned}`)
        .timeout(15000)
        .field('file', file)
        .attach('file', file, { filename });
      expect(response.status).toBe(403);
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.FORBIDDEN.USER);
    });

    it('should be able to upload product image', async () => {
      const filePath = path.resolve(__dirname, 'files', 'valid-file.jpg');
      const response = await request(app.getHttpServer())
        .post(`/products-image/${product_id}/upload`)
        .set('Authorization', `Bearer ${accessToken}`)
        .timeout(10000)
        .field('file', filePath)
        .attach('file', filePath);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe(
        Const.MESSAGE.SUCCESS.CREATED.PRODUCT_IMAGE,
      );
      expect(response.body.data).toBeDefined();
      product_image_id = response.body.data.id;
    }, 10000);

    it('should be rejected if product image is already exists', async () => {
      const filePath = path.resolve(__dirname, 'files', 'valid-file.jpg');

      const response = await request(app.getHttpServer())
        .post(`/products-image/${product_id}/upload`)
        .set('Authorization', `Bearer ${accessToken}`)
        .timeout(15000)
        .field('file', filePath)
        .attach('file', filePath);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        Const.MESSAGE.ERROR.BAD_REQUEST.PRODUCT_IMAGE_ALREADY_EXISTS,
      );
    });
  });

  describe('PATCH /products-image/:productImageId/upload', () => {
    it('should be rejected if token not provided', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/products-image/${product_image_id}/upload`)
        .set('Authorization', '');
      expect(response.status).toBe(401);
      expect(response.body.message).toBeDefined();
    });

    it('should be rejected if request product image not found', async () => {
      const response = await request(app.getHttpServer())
        .patch('/products-image/random-id/upload')
        .set('Authorization', `Bearer ${accessToken}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe(
        Const.MESSAGE.ERROR.NOT_FOUND.PRODUCT_IMAGE,
      );
    });

    it('should be rejected if user have not role', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/products-image/${product_image_id}/upload`)
        .set('Authorization', `Bearer ${accessTokenInvalidRole}`);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.FORBIDDEN.ROLE);
    });

    it('should be rejected if user not owned', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/products-image/${product_image_id}/upload`)
        .set('Authorization', `Bearer ${accessTokenNotOwned}`);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.FORBIDDEN.USER);
    });

    it('should be rejected if request invalid file type', async () => {
      const filePath = path.resolve(__dirname, 'files', 'invalid-type.txt');
      const response = await request(app.getHttpServer())
        .patch(`/products-image/${product_image_id}/upload`)
        .set('Authorization', `Bearer ${accessToken}`)
        .field('file', filePath)
        .attach('file', filePath);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        Const.MESSAGE.ERROR.BAD_REQUEST.INVALID_FILE_TYPE,
      );
    });

    it('should be rejected if request invalid when file to large', async () => {
      const filePath = path.resolve(__dirname, 'files', 'to-large-file.jpg');
      const response = await request(app.getHttpServer())
        .patch(`/products-image/${product_image_id}/upload`)
        .set('Authorization', `Bearer ${accessToken}`)
        .field('file', filePath)
        .attach('file', filePath);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        Const.MESSAGE.ERROR.BAD_REQUEST.INVALID_FILE_SIZE,
      );
    });

    it('should be able to update product image', async () => {
      const filePath = path.resolve(
        __dirname,
        'files',
        'update-valid-file.png',
      );
      const response = await request(app.getHttpServer())
        .patch(`/products-image/${product_image_id}/upload`)
        .set('Authorization', `Bearer ${accessToken}`)
        .field('file', filePath)
        .attach('file', filePath);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        Const.MESSAGE.SUCCESS.UPDATED.PRODUCT_IMAGE,
      );
      expect(response.body.data).toBeDefined();
    }, 10000);
  });

  describe('DELETE /products-image/:productImageId', () => {
    it('should be rejected if token not provided', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/products-image/${product_image_id}`)
        .set('Authorization', '');
      expect(response.status).toBe(401);
      expect(response.body.message).toBeDefined();
    });

    it('should be rejected if request product image not found', async () => {
      const response = await request(app.getHttpServer())
        .delete('/products-image/random-id')
        .set('Authorization', `Bearer ${accessToken}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe(
        Const.MESSAGE.ERROR.NOT_FOUND.PRODUCT_IMAGE,
      );
    });

    it('should be rejected if user have not role', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/products-image/${product_image_id}`)
        .set('Authorization', `Bearer ${accessTokenInvalidRole}`);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.FORBIDDEN.ROLE);
    });

    it('should be rejected if user not owned', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/products-image/${product_image_id}`)
        .set('Authorization', `Bearer ${accessTokenNotOwned}`);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe(Const.MESSAGE.ERROR.FORBIDDEN.USER);
    });

    it('should be able to delete product image', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/products-image/${product_image_id}`)
        .set('Authorization', `Bearer ${accessToken}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        Const.MESSAGE.SUCCESS.DELETED.PRODUCT_IMAGE,
      );
    });
  });
});
