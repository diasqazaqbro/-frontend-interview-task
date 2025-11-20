import { VariationStats } from '../model/types';

export const calcConversionRate = (visits: number, conversions: number): number => {
  if (visits === 0) return 0;
  return (conversions / visits) * 100;
};

export const createVariationStats = (
  visits: number,
  conversions: number
): VariationStats => {
  return {
    visits,
    conversions,
    conversionRate: calcConversionRate(visits, conversions),
  };
};

