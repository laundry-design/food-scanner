import React from 'react';
import BottomSheet from '@/components/BottomSheet';
import { NutritionMetrics } from '@/components/camera';
import { useDietStore, DietData } from '@/stores/dietStore';
import { useUserStore } from '@/stores/userStore';

interface DietBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  dietData: DietData | null;
  isExpanded: boolean;
  onExpansionChange: (expanded: boolean) => void;
}

export default function DietBottomSheet({
  isVisible,
  onClose,
  dietData,
  isExpanded,
  onExpansionChange,
}: DietBottomSheetProps) {
  const { addDietToUser, isLoading } = useDietStore();
  const { user } = useUserStore();

  const handleAddToDiet = async () => {
    if (!dietData || !user?.id) return;
    
    try {
      await addDietToUser(dietData.id, user.id);
      // You can add a success toast/notification here
      console.log('Diet added successfully!');
    } catch (error) {
      console.error('Failed to add diet:', error);
      // You can add an error toast/notification here
    }
  };

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
        onAddToDiet={handleAddToDiet}
        isLoading={isLoading}
      />
    </BottomSheet>
  );
}