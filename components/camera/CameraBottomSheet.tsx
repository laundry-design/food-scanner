import React from 'react';
import BottomSheet from '@/components/BottomSheet';
import CameraNavigation from './CameraNavigation';
import NutritionMetrics from './NutritionMetrics';

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

interface CameraBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  selectedImage: string | null;
  isExpanded: boolean;
  onExpansionChange: (expanded: boolean) => void;
  
  // Navigation props
  activeTab: 'camera' | 'barcode' | 'gallery';
  onTabPress: (tab: 'camera' | 'barcode' | 'gallery') => void;
  onCapturePress: () => void;
  
  // Metrics props
  dietData?: DietData;
  onAddToDiet?: () => void;
}

export default function CameraBottomSheet({
  isVisible,
  onClose,
  selectedImage,
  isExpanded,
  onExpansionChange,
  activeTab,
  onTabPress,
  onCapturePress,
  dietData,
  onAddToDiet,
}: CameraBottomSheetProps) {
  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      enableExpansion={!!selectedImage}
      onExpansionChange={onExpansionChange}
      initialHeight={0.25}
      expandedHeight={0.65}
      showCloseButton={isExpanded}
    >
      {!selectedImage ? (
        <CameraNavigation
          activeTab={activeTab}
          onTabPress={onTabPress}
          onCapturePress={onCapturePress}
          showCaptureButton={!selectedImage}
        />
      ) : (
        dietData && onAddToDiet && (
          <NutritionMetrics
            dietData={dietData}
            isExpanded={isExpanded}
            onAddToDiet={onAddToDiet}
          />
        )
      )}
    </BottomSheet>
  );
}