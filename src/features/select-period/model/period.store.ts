import { create } from 'zustand';

export type Period = 'day' | 'week';

interface PeriodStore {
  selectedPeriod: Period;
  setPeriod: (period: Period) => void;
}

export const usePeriodStore = create<PeriodStore>((set) => ({
  selectedPeriod: 'day',
  setPeriod: (period: Period) => set({ selectedPeriod: period }),
}));

