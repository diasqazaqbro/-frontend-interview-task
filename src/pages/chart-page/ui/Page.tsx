import React, { useMemo, useEffect } from 'react';
import { ChartWidget } from 'widgets/chart-widget/ui/ChartWidget';
import { ControlsWidget } from 'widgets/controls-widget/ui/ControlsWidget';
import { convertRawData } from 'entities/stats/model/convert';
import { groupByWeek } from 'entities/stats/lib/groupByWeek';
import { useVariationsStore } from 'features/select-variations/model/store';
import rawData from 'shared/api/data.json';
import styles from './Page.module.css';

const VARIATION_COLORS: Record<string, string> = {
  '0': '#3b82f6',      // Original - синий
  '10001': '#10b981',   // Variation A - зеленый
  '10002': '#f59e0b',   // Variation B - оранжевый
  '10003': '#ef4444',   // Variation C - красный
};

export const ChartPage: React.FC = () => {
  const setSelectedVariations = useVariationsStore((state) => state.setSelectedVariations);

  // Преобразуем данные
  const dayData = useMemo(() => convertRawData(rawData), []);
  const weekData = useMemo(() => groupByWeek(dayData), [dayData]);

  // Создаем список вариаций с цветами
  const variations = useMemo(() => {
    return rawData.variations.map((variation) => {
      const id = variation.id?.toString() || '0';
      return {
        id,
        name: variation.name,
        color: VARIATION_COLORS[id] || '#000000',
      };
    });
  }, []);

  // Инициализируем выбранные вариации при первой загрузке
  useEffect(() => {
    const allVariationIds = variations.map((v) => v.id);
    setSelectedVariations(allVariationIds);
  }, [variations, setSelectedVariations]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>A/B Test Conversion Rate</h1>
        <div className={styles.content}>
          <div className={styles.controls}>
            <ControlsWidget variations={variations} />
          </div>
          <div className={styles.chart}>
            <ChartWidget
              dayData={dayData}
              weekData={weekData}
              variationColors={VARIATION_COLORS}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

