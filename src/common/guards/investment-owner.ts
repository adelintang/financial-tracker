import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InvestmentsRepository } from '../../modules/investments/repository/investments.repository';
import { Const } from '../constans';

@Injectable()
export class InvestmentOwner implements CanActivate {
  constructor(private readonly investmentsRepository: InvestmentsRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest();
    const investment = await this.investmentsRepository.getInvestmentById(
      params.investmentId,
    );
    if (!investment) {
      throw new NotFoundException(Const.MESSAGE.ERROR.NOT_FOUND.INVESTMENT);
    }
    if (user.userId !== investment.userId) {
      throw new ForbiddenException(Const.MESSAGE.ERROR.FORBIDDEN.USER);
    }
    return true;
  }
}
