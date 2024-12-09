export const getPrompt = (additional_context: string) => {
  return `Analyze the provided image to estimate the food composition, including calories and macronutrients (proteins, carbohydrates, fats). Follow these steps:
## Food Identification:
+ Identify all visible food items and ingredients in the image.
+ Recognize the preparation methods (e.g., fried, boiled, baked) and identify any sauces, dressings, or garnishes.
## Quantities Estimation:
+ Use visual cues such as the plate's size, utensils, or visible reference objects for scale to estimate serving sizes.
+ Apply realistic serving size approximations for common foods, with a focus on capturing large portions.
## Caloric and Macronutrient Estimation:
+ Reference reliable nutritional databases (e.g., USDA, NIH) for standard caloric and macronutrient values.
+ Adjust estimates based on visual factors such as portion size, density, and additions (e.g., oil, cheese, cream).
+ For large portions, explicitly compare estimated values to known data for oversized servings to avoid underestimations.
## Calibration and Adjustment:
+ Consider edge cases where visual estimations may diverge from standard serving norms.`;
};
