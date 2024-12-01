import { userMapper } from 'src/modules/users/dto/user.mapper';
import {
  IProduct,
  IProductImage,
  IProductWithImage,
} from './product.interface';
import { ProductImage } from '@prisma/client';

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
    user: userMapper(product.user),
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
