import { Investment, InvestmentType, User } from '@prisma/client';
import { QueryParams } from 'src/types';

export interface IInvestment extends Investment {
  user: User;
  investmentType: InvestmentType;
}

export interface InvestmentQueryParams extends QueryParams {
  date: string;
  type: string;
}
