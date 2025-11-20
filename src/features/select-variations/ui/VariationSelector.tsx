import React from 'react';
import { Checkbox } from 'shared/ui/Checkbox';
import { useVariationsStore } from '../model/store';
import styles from './VariationSelector.module.css';

interface Variation {
  id: string;
  name: string;
  color: string;
}

interface VariationSelectorProps {
  variations: Variation[];
}

export const VariationSelector: React.FC<VariationSelectorProps> = ({
  variations,
}) => {
  const selectedVariations = useVariationsStore((state) => state.selectedVariations);
  const toggleVariation = useVariationsStore((state) => state.toggleVariation);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Вариации</h3>
      <div className={styles.list}>
        {variations.map((variation) => {
          const isSelected = selectedVariations.includes(variation.id);
          return (
            <div key={variation.id} className={styles.item}>
              <div
                className={styles.colorIndicator}
                style={{ backgroundColor: variation.color }}
              />
              <Checkbox
                checked={isSelected}
                onChange={() => toggleVariation(variation.id)}
                label={variation.name}
                disabled={
                  isSelected && selectedVariations.length === 1
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

