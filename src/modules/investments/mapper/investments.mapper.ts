import { userMapper } from 'src/modules/users/mapper/user.mapper';
import { IInvestment } from '../models/investments.interface';
import {
  GetInvestmentResponse,
  GetInvestmentsResponse,
} from '../models/investments.reponse';
import { investmentTypeMapper } from 'src/modules/investment-types/mapper/investment-types.mapper';

export const investmentMapper = (
  investment: IInvestment,
): GetInvestmentResponse => {
  return {
    id: investment.id,
    name: investment.name,
    amount: investment.amount,
    valueBuy: investment.valueBuy,
    profitLoss: investment.profitLoss ?? null,
    createdAt: investment.createdAt,
    updatedAt: investment.updatedAt,
    user: userMapper(investment.user),
    investmentType: investmentTypeMapper(investment.investmentType),
  };
};

export const investmentsMapper = (
  investments: IInvestment[],
): GetInvestmentsResponse[] => {
  return investments.map((investment) => {
    return {
      id: investment.id,
      name: investment.name,
      amount: investment.amount,
      valueBuy: investment.valueBuy,
      profitLoss: investment.profitLoss ?? null,
      createdAt: investment.createdAt,
      updatedAt: investment.updatedAt,
      userId: investment.userId,
      investmentType: investmentTypeMapper(investment.investmentType),
    };
  });
};
