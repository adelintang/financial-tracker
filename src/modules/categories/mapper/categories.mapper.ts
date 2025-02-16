import { Category } from '@prisma/client';
import { CategoryResonse } from '../models/category.response';

export const categoryMapper = (category: Category): CategoryResonse => {
  return {
    id: category.id,
    name: category.name,
    type: category.type,
  };
};

export const categoriesMapper = (categories: Category[]): CategoryResonse[] => {
  return categories.map((category) => categoryMapper(category));
};
