import { Product, ProductImage, User } from '@prisma/client';
import { IUser } from '../../users/dto/user.interface';

export interface IProductWithImage extends Product {
  user: User;
  productImage: ProductImage;
}

export interface IProductImage {
  id: string;
  public_id: string;
  file_url: string;
}

export interface IProduct {
  id: string;
  name: string;
  desc: string;
  price: number;
  qty: number;
  user: IUser;
  productImage: IProductImage | null;
}
