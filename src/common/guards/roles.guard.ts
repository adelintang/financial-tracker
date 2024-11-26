import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Observable } from 'rxjs';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../../modules/auth/jwt-auth.guard';

@Injectable()
@UseGuards(JwtAuthGuard)
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}
