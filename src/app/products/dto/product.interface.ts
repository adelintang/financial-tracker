import { IUserInProduct } from '../../users/dto/user.response';

export interface IProductImage {
  id: string;
  public_id: string;
  file_url: string;
}

export interface IProduct extends IProductInUser {
  user: IUserInProduct;
}

export interface IProductInUser {
  id: string;
  name: string;
  desc: string;
  price: number;
  qty: number;
  productImage: IProductImage | null;
}
