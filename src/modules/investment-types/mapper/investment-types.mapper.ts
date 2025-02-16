import { InvestmentType } from '@prisma/client';
import { InvestmentTypeResponse } from '../models/investment-type.response';

export const investmentTypeMapper = (
  investmentType: InvestmentType,
): InvestmentTypeResponse => {
  return {
    id: investmentType.id,
    type: investmentType.type,
  };
};

export const investmentTypesMapper = (
  investmentTypes: InvestmentType[],
): InvestmentTypeResponse[] => {
  return investmentTypes.map((investmentType) =>
    investmentTypeMapper(investmentType),
  );
};
