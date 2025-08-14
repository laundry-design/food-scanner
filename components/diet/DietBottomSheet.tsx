import React from 'react';
import BottomSheet from '@/components/BottomSheet';
import { NutritionMetrics } from '@/components/camera';

interface NutritionData {
  calories: { value: string; progress: number; color: string };
  protein: { value: string; progress: number; color: string };
  carbs: { value: string; progress: number; color: string };
  fat: { value: string; progress: number; color: string };
}

interface DietData {
  id: string;
  title: string;
  description: string;
  nutrition: NutritionData;
  goal: string;
}

interface DietBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  dietData: DietData | null;
  isExpanded: boolean;
  onExpansionChange: (expanded: boolean) => void;
  onAddToDiet: () => void;
}

export default function DietBottomSheet({
  isVisible,
  onClose,
  dietData,
  isExpanded,
  onExpansionChange,
  onAddToDiet,
}: DietBottomSheetProps) {
  if (!dietData) return null;

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      enableExpansion={true}
      onExpansionChange={onExpansionChange}
      initialHeight={0.35}
      expandedHeight={0.75}
      showCloseButton={isExpanded}
    >
      <NutritionMetrics
        dietData={dietData}
        isExpanded={isExpanded}
        onAddToDiet={onAddToDiet}
      />
    </BottomSheet>
  );
}