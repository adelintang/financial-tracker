import { Investment, InvestmentType, User } from '@prisma/client';

export interface IInvestment extends Investment {
  user: User;
  investmentType: InvestmentType;
}
