import React from 'react';
import { Select } from 'shared/ui/Select';
import { usePeriodStore, Period } from '../model/period.store';
import styles from './PeriodSelector.module.css';

export const PeriodSelector: React.FC = () => {
  const selectedPeriod = usePeriodStore((state) => state.selectedPeriod);
  const setPeriod = usePeriodStore((state) => state.setPeriod);

  return (
    <div className={styles.container}>
      <label className={styles.label}>Период:</label>
      <Select
        value={selectedPeriod}
        onChange={(value) => setPeriod(value as Period)}
        options={[
          { value: 'day', label: 'День' },
          { value: 'week', label: 'Неделя' },
        ]}
      />
    </div>
  );
};

