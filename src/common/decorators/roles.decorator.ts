import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Const } from '../constans';

export const Roles = (...roles: Role[]) => SetMetadata(Const.ROLES_KEY, roles);
