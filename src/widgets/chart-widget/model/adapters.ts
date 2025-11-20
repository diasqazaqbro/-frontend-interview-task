import { ProcessedDataPoint } from 'entities/stats/model/types';
import { WeeklyDataPoint } from 'entities/stats/lib/groupByWeek';
import { formatDate } from 'shared/lib/dateUtils';

export interface ChartDataPoint {
  date: string;
  [key: string]: string | number;
}

export const adaptDayDataForChart = (
  data: ProcessedDataPoint[],
  variationIds: string[]
): ChartDataPoint[] => {
  return data.map((point) => {
    const result: ChartDataPoint = {
      date: formatDate(point.date),
      dateKey: point.date,
    };

    variationIds.forEach((variationId) => {
      const stats = point.variations[variationId];
      if (stats) {
        result[`${variationId}_rate`] = stats.conversionRate;
        result[`${variationId}_visits`] = stats.visits;
        result[`${variationId}_conversions`] = stats.conversions;
      }
    });

    return result;
  });
};

export const adaptWeekDataForChart = (
  data: WeeklyDataPoint[],
  variationIds: string[]
): ChartDataPoint[] => {
  return data.map((point) => {
    const result: ChartDataPoint = {
      date: formatDate(point.weekStart),
      dateKey: point.weekStart,
    };

    variationIds.forEach((variationId) => {
      const stats = point.variations[variationId];
      if (stats) {
        result[`${variationId}_rate`] = stats.conversionRate;
        result[`${variationId}_visits`] = stats.visits;
        result[`${variationId}_conversions`] = stats.conversions;
      }
    });

    return result;
  });
};

