import React from 'react';
import { Button } from 'shared/ui/Button';
import { exportChartToPNG } from '../lib/export';
import styles from './ExportButton.module.css';

interface ExportButtonProps {
  chartId: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ chartId }) => {
  const handleExport = async () => {
    await exportChartToPNG(chartId);
  };

  return (
    <Button onClick={handleExport} variant="secondary" className={styles.button}>
      📥 Экспорт PNG
    </Button>
  );
};

