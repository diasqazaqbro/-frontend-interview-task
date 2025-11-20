import { ProcessedDataPoint, VariationStats } from '../model/types';
import { getWeekKey } from 'shared/lib/dateUtils';

export interface WeeklyDataPoint {
  weekStart: string;
  variations: Record<string, VariationStats>;
}

export const groupByWeek = (data: ProcessedDataPoint[]): WeeklyDataPoint[] => {
  const weekMap = new Map<string, Map<string, { visits: number; conversions: number }>>();

  // Группируем данные по неделям
  data.forEach((point) => {
    const weekKey = getWeekKey(point.date);
    
    if (!weekMap.has(weekKey)) {
      weekMap.set(weekKey, new Map());
    }
    
    const weekVariations = weekMap.get(weekKey)!;
    
    Object.entries(point.variations).forEach(([variationId, stats]) => {
      if (!weekVariations.has(variationId)) {
        weekVariations.set(variationId, { visits: 0, conversions: 0 });
      }
      
      const weekStats = weekVariations.get(variationId)!;
      weekStats.visits += stats.visits;
      weekStats.conversions += stats.conversions;
    });
  });

  // Преобразуем в массив и вычисляем средние conversion rates
  const result: WeeklyDataPoint[] = [];
  
  weekMap.forEach((variations, weekStart) => {
    const weekVariations: Record<string, VariationStats> = {};
    
    variations.forEach((stats, variationId) => {
      weekVariations[variationId] = {
        visits: stats.visits,
        conversions: stats.conversions,
        conversionRate: stats.visits > 0 
          ? (stats.conversions / stats.visits) * 100 
          : 0,
      };
    });
    
    result.push({
      weekStart,
      variations: weekVariations,
    });
  });

  // Сортируем по дате
  result.sort((a, b) => a.weekStart.localeCompare(b.weekStart));

  return result;
};

