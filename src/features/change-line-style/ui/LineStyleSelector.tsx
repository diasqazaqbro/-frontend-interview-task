import React from 'react';
import { Select } from 'shared/ui/Select';
import { useLineStyleStore, LineStyle } from '../model/lineStyle.store';
import styles from './LineStyleSelector.module.css';

export const LineStyleSelector: React.FC = () => {
  const lineStyle = useLineStyleStore((state) => state.lineStyle);
  const setLineStyle = useLineStyleStore((state) => state.setLineStyle);

  return (
    <div className={styles.container}>
      <label className={styles.label}>Стиль линии:</label>
      <Select
        value={lineStyle}
        onChange={(value) => setLineStyle(value as LineStyle)}
        options={[
          { value: 'line', label: 'Линия' },
          { value: 'smooth', label: 'Сглаженная' },
          { value: 'area', label: 'Область' },
        ]}
      />
    </div>
  );
};

