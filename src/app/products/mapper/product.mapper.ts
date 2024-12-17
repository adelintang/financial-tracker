import { userInProductMapper } from '../../users/mapper/user.mapper';
import {
  IProduct,
  IProductImage,
  IProductInUser,
} from '../dto/product.interface';
import { ProductImage } from '@prisma/client';
import { IProductWithImage } from '../interface';

export const productsMapper = (products: IProductWithImage[]): IProduct[] => {
  return products.map((product) => productMapper(product));
};

export const productMapper = (product: IProductWithImage): IProduct => {
  return {
    id: product.id,
    name: product.name,
    desc: product.desc,
    price: product.price,
    qty: product.qty,
    user: userInProductMapper(product.user),
    productImage: product.productImage
      ? productImageMapper(product.productImage)
      : null,
  };
};

const productImageMapper = (productImage: ProductImage): IProductImage => {
  return {
    id: productImage.id,
    public_id: productImage.public_id,
    file_url: productImage.file_url,
  };
};

const productInUser = (product: IProductWithImage): IProductInUser => {
  return {
    id: product.id,
    name: product.name,
    desc: product.desc,
    price: product.price,
    qty: product.qty,
    productImage: product.productImage
      ? productImageMapper(product.productImage)
      : null,
  };
};

export const productsInUser = (
  products: IProductWithImage[],
): IProductInUser[] => {
  return products.map((product) => productInUser(product));
};
