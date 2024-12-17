import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Const } from '../constans';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(
    _err: any,
    user: any,
    info: any,
    context: ExecutionContext,
  ): TUser {
    const { authorization } = context.switchToHttp().getRequest().headers;

    if (!authorization || !authorization.includes('Bearer')) {
      throw new UnauthorizedException(Const.MESSAGE.ERROR.AUTH.NO_TOKEN);
    }
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException(Const.MESSAGE.ERROR.AUTH.EXPIRED_TOKEN);
    } else if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException(Const.MESSAGE.ERROR.AUTH.INVALID_TOKEN);
    }

    return user;
  }
}
