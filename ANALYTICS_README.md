# Analytics Feature

This document describes the Analytics feature implementation for the nutrition analysis mobile app.

## Overview

The Analytics page provides users with comprehensive nutrition analysis data including calorie trends, macro distribution, and interactive time range selection.

## Components

### 1. Header Component (`Header.tsx`)
- **Purpose**: Displays the page title "Analysis"
- **Props**: `title: string`
- **Styling**: Large, bold white text with proper spacing

### 2. Nutrition Analysis Card (`NutritionAnalysisCard.tsx`)
- **Purpose**: Introductory card with gradient background
- **Features**: 
  - Green gradient background
  - Title: "Your Nutrition Analysis"
  - Subtitle: "Track trends. Spot patterns. Crush your goals."
- **Styling**: Rounded corners, gradient background, white text

### 3. Time Range Selector (`TimeRangeSelector.tsx`)
- **Purpose**: Interactive segmented control for time range selection
- **Options**: Daily, Weekly, Monthly
- **Features**:
  - Touchable segments
  - Active state highlighting
  - Smooth transitions
- **Props**: `selected: TimeRange`, `onSelect: (range: TimeRange) => void`

### 4. Calorie Trends Card (`CalorieTrendsCard.tsx`)
- **Purpose**: Displays calorie data with line chart visualization
- **Features**:
  - Purple gradient background
  - Line chart with multiple data series
  - Interactive legend
  - Responsive chart sizing
- **Props**: `data: CalorieData[]`
- **Chart Library**: react-native-chart-kit

### 5. Macro Distribution Card (`MacroDistributionCard.tsx`)
- **Purpose**: Shows macronutrient distribution with visual bars
- **Features**:
  - Yellow gradient background
  - Horizontal bar visualization
  - Percentage display
  - Color-coded macros
- **Props**: `data: MacroData[]`

## Data Types

### CalorieData
```typescript
interface CalorieData {
  data: number[];
  color: string;
  label: string;
}
```

### MacroData
```typescript
interface MacroData {
  name: string;
  percentage: number;
  color: string;
}
```

### TimeRange
```typescript
type TimeRange = 'Daily' | 'Weekly' | 'Monthly';
```

## Navigation

The Analytics page is accessible through the bottom navigation bar:
- **Position**: Between Home and Camera tabs
- **Icon**: Chart line uptrend icon (`chart.line.uptrend.xyaxis`)
- **Active State**: Orange background when selected

## Styling

### Color Scheme
- **Background**: Dark theme (#1a1a1a)
- **Text Primary**: White (#ffffff)
- **Text Secondary**: Light gray (#b0b0b0)
- **Accent Colors**:
  - Green: #4ade80 (Nutrition card)
  - Purple: #a855f7 (Calorie trends)
  - Yellow: #fbbf24 (Macro distribution)
  - Orange: #f97316 (Active states)

### Layout
- **Padding**: 16px
- **Border Radius**: 16px
- **Component Spacing**: 16px
- **Safe Area**: Enabled

## Dependencies

The following dependencies are required:
- `react-native-chart-kit`: For chart visualizations
- `react-native-linear-gradient`: For gradient backgrounds
- `react-native-svg`: For chart rendering
- `@react-native-community/slider`: For interactive elements

## Usage

```typescript
import { AnalyticsScreen } from '@/app/(tabs)/analytics';

// The screen is automatically integrated into the tab navigation
// and can be accessed via the bottom navigation bar
```

## Reusability

All components are designed to be reusable:
- **Props-based**: All data is passed through props
- **Type-safe**: Full TypeScript implementation
- **Modular**: Each component is self-contained
- **Customizable**: Colors, data, and styling can be easily modified

## Performance Considerations

- Charts are optimized for mobile rendering
- Components use React.memo where appropriate
- Gradient backgrounds are hardware accelerated
- Smooth animations and transitions 