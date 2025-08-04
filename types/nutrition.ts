export interface CalorieData {
  data: number[];
  color: string;
  label: string;
}

export interface MacroData {
  name: string;
  percentage: number;
  color: string;
}

export type TimeRange = 'Daily' | 'Weekly' | 'Monthly';

export interface NutritionAnalysisData {
  calorieData: CalorieData[];
  macroData: MacroData[];
  selectedTimeRange: TimeRange;
} 