import { useVariationsStore } from './store';

export const useSelectedVariations = () => {
  return useVariationsStore((state) => state.selectedVariations);
};

export const useToggleVariation = () => {
  return useVariationsStore((state) => state.toggleVariation);
};

