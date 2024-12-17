import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IProductInUser } from '../../products/dto/product.response';

export class IUserInProduct {
  @ApiProperty({
    example: '5c4394f7-d3e3-48d1-8a65-e4324fa7141e',
  })
  id: string;

  @ApiProperty({ example: 'johndoe' })
  username: string;

  @ApiProperty({ enum: [Role.SELLER, Role.CONSUMER] })
  role: Role;
}

export class IUser extends IUserInProduct {
  @ApiProperty({ type: [IProductInUser] })
  products: IProductInUser[] | null;
}
