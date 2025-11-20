export interface RawDataPoint {
  date: string;
  visits: Record<string, number>;
  conversions: Record<string, number>;
}

export interface ProcessedDataPoint {
  date: string;
  variations: Record<string, VariationStats>;
}

export interface VariationStats {
  visits: number;
  conversions: number;
  conversionRate: number;
}

export interface RawData {
  variations: Array<{ id?: number; name: string }>;
  data: RawDataPoint[];
}

