import { create } from 'zustand';

export type LineStyle = 'line' | 'smooth' | 'area';

interface LineStyleStore {
  lineStyle: LineStyle;
  setLineStyle: (style: LineStyle) => void;
}

export const useLineStyleStore = create<LineStyleStore>((set) => ({
  lineStyle: 'line',
  setLineStyle: (style: LineStyle) => set({ lineStyle: style }),
}));

