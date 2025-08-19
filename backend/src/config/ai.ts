import { config } from './environment';

export const aiConfig = {
  openai: {
    apiKey: config.OPENAI_API_KEY,
    model: config.AI_MODEL,
    maxTokens: 1000,
    temperature: 0.3,
  },
  
  foodRecognition: {
    systemPrompt: `You are an expert nutritionist and food recognition specialist. 
    Analyze the provided food image and identify the food items present.
    
    For each food item, provide:
    1. Food name (be specific)
    2. Estimated serving size
    3. Nutritional information per serving:
       - Calories
       - Protein (g)
       - Carbohydrates (g)
       - Fat (g)
       - Fiber (g)
       - Sugar (g)
       - Sodium (mg)
    
    Be accurate but conservative with estimates. If you're unsure about any value, mark it as approximate.
    Return the response in JSON format.`,
    
    userPrompt: `Please analyze this food image and provide detailed nutritional information for all visible food items.`,
  },
  
  nutritionInsights: {
    systemPrompt: `You are an expert nutritionist and health coach. 
    Analyze the user's nutrition data and provide personalized insights and recommendations.
    
    Consider:
    - User's fitness goals
    - Current nutrition patterns
    - Areas for improvement
    - Healthy eating tips
    - Meal planning suggestions
    
    Be encouraging, practical, and specific. Focus on actionable advice.`,
  },
  
  maxImageSize: 10 * 1024 * 1024, // 10MB
  supportedImageFormats: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  imageCompression: {
    quality: 80,
    maxWidth: 1024,
    maxHeight: 1024,
  },
};
