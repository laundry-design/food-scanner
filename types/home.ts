export interface MacroCardProps {
  title: string;
  value?: string;
  current?: number;
  target?: number;
  backgroundColor: string;
  textColor: string;
  showProgress?: boolean;
  gradientColors: string[];
}

export interface DietSuggestionProps {
  icon: string;
  title: string;
  description: string;
  actionText: string;
  backgroundColor: string;
  gradientColors: string[];
  onActionPress: () => void;
}

export interface DailyQuoteData {
  quote: string;
  author: string;
}

export interface MacroData {
  calories: { current: number; target: number };
  protein: { current: number; target: number };
  carbs: { current: number; target: number };
  fat: { current: number; target: number };
}

export interface DietSuggestion {
  id: string;
  icon: string;
  title: string;
  description: string;
  actionText: string;
  gradientColors: string[];
  priority: number;
} 