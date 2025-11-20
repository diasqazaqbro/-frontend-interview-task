import React from 'react';
import { VariationSelector } from 'features/select-variations/ui/VariationSelector';
import { PeriodSelector } from 'features/select-period/ui/PeriodSelector';
import { LineStyleSelector } from 'features/change-line-style/ui/LineStyleSelector';
import { ThemeToggle } from 'features/theme-toggle/ui/ThemeToggle';
import { ExportButton } from 'features/export-chart/ui/ExportButton';
import styles from './ControlsWidget.module.css';

interface Variation {
  id: string;
  name: string;
  color: string;
}

interface ControlsWidgetProps {
  variations: Variation[];
}

export const ControlsWidget: React.FC<ControlsWidgetProps> = ({ variations }) => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <VariationSelector variations={variations} />
      </div>
      <div className={styles.section}>
        <div className={styles.controlsRow}>
          <PeriodSelector />
          <LineStyleSelector />
          <ThemeToggle />
          <ExportButton chartId="chart-widget" />
        </div>
      </div>
    </div>
  );
};

