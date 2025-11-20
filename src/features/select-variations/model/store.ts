import { create } from 'zustand';

interface VariationsStore {
  selectedVariations: string[];
  toggleVariation: (variationId: string) => void;
  setSelectedVariations: (variations: string[]) => void;
}

export const useVariationsStore = create<VariationsStore>((set) => ({
  selectedVariations: [],
  toggleVariation: (variationId: string) =>
    set((state) => {
      const isSelected = state.selectedVariations.includes(variationId);
      const newSelected = isSelected
        ? state.selectedVariations.filter((id) => id !== variationId)
        : [...state.selectedVariations, variationId];
      
      // Гарантируем, что хотя бы одна вариация выбрана
      if (newSelected.length === 0) {
        return state;
      }
      
      return { selectedVariations: newSelected };
    }),
  setSelectedVariations: (variations: string[]) =>
    set({ selectedVariations: variations }),
}));

