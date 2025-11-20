import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { ProcessedDataPoint } from 'entities/stats/model/types';
import { WeeklyDataPoint } from 'entities/stats/lib/groupByWeek';
import { useSelectedVariations } from 'features/select-variations/model/selectors';
import { usePeriodStore } from 'features/select-period/model/period.store';
import { useLineStyleStore } from 'features/change-line-style/model/lineStyle.store';
import { adaptDayDataForChart, adaptWeekDataForChart } from '../model/adapters';
import { formatPercent } from 'shared/lib/formatPercent';
import styles from './ChartWidget.module.css';

interface ChartWidgetProps {
  dayData: ProcessedDataPoint[];
  weekData: WeeklyDataPoint[];
  variationColors: Record<string, string>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const variations: Array<{
    id: string;
    name: string;
    color: string;
    rate: number;
    visits: number;
    conversions: number;
  }> = [];

  payload.forEach((entry: any) => {
    if (entry.dataKey.endsWith('_rate')) {
      const variationId = entry.dataKey.replace('_rate', '');
      variations.push({
        id: variationId,
        name: entry.name || variationId,
        color: entry.color,
        rate: entry.value,
        visits: data[`${variationId}_visits`] || 0,
        conversions: data[`${variationId}_conversions`] || 0,
      });
    }
  });

  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipDate}>{label}</div>
      {variations.map((variation) => (
        <div key={variation.id} className={styles.tooltipItem}>
          <div
            className={styles.tooltipColor}
            style={{ backgroundColor: variation.color }}
          />
          <div className={styles.tooltipContent}>
            <div className={styles.tooltipName}>{variation.name}</div>
            <div className={styles.tooltipStats}>
              <div>Визиты: {variation.visits}</div>
              <div>Конверсии: {variation.conversions}</div>
              <div>CR: {formatPercent(variation.rate)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ChartWidget: React.FC<ChartWidgetProps> = ({
  dayData,
  weekData,
  variationColors,
}) => {
  const selectedVariations = useSelectedVariations();
  const selectedPeriod = usePeriodStore((state) => state.selectedPeriod);
  const lineStyle = useLineStyleStore((state) => state.lineStyle);

  const chartData = useMemo(() => {
    if (selectedPeriod === 'day') {
      return adaptDayDataForChart(dayData, selectedVariations);
    } else {
      return adaptWeekDataForChart(weekData, selectedVariations);
    }
  }, [dayData, weekData, selectedVariations, selectedPeriod]);

  // Вычисляем диапазон Y оси на основе видимых данных
  const yDomain = useMemo(() => {
    const rates: number[] = [];
    chartData.forEach((point) => {
      selectedVariations.forEach((variationId) => {
        const rate = point[`${variationId}_rate`] as number;
        if (typeof rate === 'number' && !isNaN(rate)) {
          rates.push(rate);
        }
      });
    });

    if (rates.length === 0) return [0, 100];

    const min = Math.max(0, Math.min(...rates) - 2);
    const max = Math.min(100, Math.max(...rates) + 2);

    return [min, max];
  }, [chartData, selectedVariations]);

  const renderLines = () => {
    return selectedVariations.map((variationId) => {
      const color = variationColors[variationId] || '#000000';
      const dataKey = `${variationId}_rate`;

      if (lineStyle === 'area') {
        return (
          <Area
            key={variationId}
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            fill={color}
            fillOpacity={0.2}
            strokeWidth={2}
            name={variationId}
            dot={false}
          />
        );
      } else if (lineStyle === 'smooth') {
        return (
          <Line
            key={variationId}
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            name={variationId}
            dot={false}
          />
        );
      } else {
        return (
          <Line
            key={variationId}
            type="linear"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            name={variationId}
            dot={false}
          />
        );
      }
    });
  };

  const ChartComponent = lineStyle === 'area' ? AreaChart : LineChart;

  return (
    <div id="chart-widget" className={styles.container}>
      <ResponsiveContainer width="100%" height={500}>
        <ChartComponent
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
          <XAxis
            dataKey="date"
            stroke="var(--text-secondary)"
            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
          />
          <YAxis
            domain={yDomain}
            stroke="var(--text-secondary)"
            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
            tickFormatter={(value) => formatPercent(value)}
          />
          <Tooltip content={<CustomTooltip />} />
          {renderLines()}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

