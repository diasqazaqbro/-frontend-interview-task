import { RawDataPoint, ProcessedDataPoint, RawData } from './types';
import { createVariationStats } from '../lib/calcRate';

export const convertRawData = (rawData: RawData): ProcessedDataPoint[] => {
  return rawData.data.map((point: RawDataPoint) => {
    const variations: Record<string, { visits: number; conversions: number; conversionRate: number }> = {};

    // Обрабатываем все вариации из visits и conversions
    const allVariationIds = new Set([
      ...Object.keys(point.visits),
      ...Object.keys(point.conversions),
    ]);

    allVariationIds.forEach((variationId) => {
      const visits = point.visits[variationId] || 0;
      const conversions = point.conversions[variationId] || 0;
      
      if (visits > 0 || conversions > 0) {
        variations[variationId] = createVariationStats(visits, conversions);
      }
    });

    return {
      date: point.date,
      variations,
    };
  });
};

