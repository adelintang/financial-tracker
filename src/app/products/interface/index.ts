import { Product, ProductImage, User } from '@prisma/client';

export interface IProductWithImage extends Product {
  user: User;
  productImage: ProductImage;
}
