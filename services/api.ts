// API service for FoodScanner app
// This service handles all API calls to the backend

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3002/api/v1';

// Mock data for development (remove in production)
const MOCK_USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    plan: 'premium',
    age: 28,
    weight: 75.5,
    weightUnit: 'KG',
    height: 175,
    heightUnit: 'CM',
    gender: 'male',
    fitnessGoal: 'build_muscle',
    gymActivity: '3_times_week',
    dietFocus: 'high_protein',
    isOnboardingCompleted: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    plan: 'basic',
    age: 25,
    weight: 60.0,
    weightUnit: 'KG',
    height: 165,
    heightUnit: 'CM',
    gender: 'female',
    fitnessGoal: 'lose_weight',
    gymActivity: '2_times_week',
    dietFocus: 'low_carb',
    isOnboardingCompleted: false,
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z',
  },
];

const MOCK_TOKENS: Record<string, string> = {
  'john@example.com': 'mock_token_john_123',
  'jane@example.com': 'mock_token_jane_456',
};

// Mock nutrition data
const MOCK_NUTRITION = {
  daily: {
    totalCalories: 1850,
    totalProtein: 120.5,
    totalCarbs: 180.2,
    totalFat: 65.8,
    totalFiber: 25.3,
    totalSugar: 45.2,
    totalSodium: 2100,
  },
  weekly: [
    { date: '2024-01-01', calories: 1850, protein: 120.5, carbs: 180.2, fat: 65.8 },
    { date: '2024-01-02', calories: 1920, protein: 125.3, carbs: 185.1, fat: 68.2 },
    { date: '2024-01-03', calories: 1780, protein: 118.7, carbs: 175.8, fat: 62.5 },
    { date: '2024-01-04', calories: 1950, protein: 128.9, carbs: 190.3, fat: 70.1 },
    { date: '2024-01-05', calories: 1820, protein: 122.4, carbs: 178.9, fat: 64.8 },
    { date: '2024-01-06', calories: 1880, protein: 124.6, carbs: 182.5, fat: 66.9 },
    { date: '2024-01-07', calories: 1900, protein: 126.1, carbs: 184.7, fat: 67.5 },
  ],
};

// Mock food history
const MOCK_FOOD_HISTORY = [
  {
    id: '1',
    name: 'Grilled Chicken Breast',
    imageUrl: 'https://placehold.co/300x200/4CAF50/FFFFFF?text=Chicken',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    sugar: 0,
    sodium: 74,
    mealType: 'lunch',
    consumedAt: '2024-01-01T12:00:00.000Z',
    createdAt: '2024-01-01T12:00:00.000Z',
  },
  {
    id: '2',
    name: 'Brown Rice',
    imageUrl: 'https://placehold.co/300x200/8BC34A/FFFFFF?text=Rice',
    calories: 216,
    protein: 4.5,
    carbs: 45,
    fat: 1.8,
    fiber: 3.5,
    sugar: 0.4,
    sodium: 10,
    mealType: 'lunch',
    consumedAt: '2024-01-01T12:00:00.000Z',
    createdAt: '2024-01-01T12:00:00.000Z',
  },
  {
    id: '3',
    name: 'Broccoli',
    imageUrl: 'https://placehold.co/300x200/4CAF50/FFFFFF?text=Broccoli',
    calories: 55,
    protein: 3.7,
    carbs: 11.2,
    fat: 0.6,
    fiber: 5.2,
    sugar: 2.6,
    sodium: 33,
    mealType: 'lunch',
    consumedAt: '2024-01-01T12:00:00.000Z',
    createdAt: '2024-01-01T12:00:00.000Z',
  },
];

// Mock diet data
const MOCK_DIETS = [
  {
    id: 'diet_1',
    title: 'Mediterranean Bowl',
    description: 'A nutritious Mediterranean-inspired bowl with quinoa, grilled chicken, fresh vegetables, and olive oil dressing.',
    nutrition: {
      calories: { value: '520', progress: 0.65, color: '#ff6b6b' },
      protein: { value: '35g', progress: 0.7, color: '#4ecdc4' },
      carbs: { value: '45g', progress: 0.6, color: '#45b7d1' },
      fat: { value: '22g', progress: 0.55, color: '#f9ca24' },
    },
    goal: 'Perfect for muscle building and weight management. High in protein and healthy fats.',
    category: 'Healthy',
    difficulty: 'Easy',
    duration: '15 mins',
    tags: ['High Protein', 'Mediterranean', 'Gluten-Free'],
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'diet_2',
    title: 'Keto Salmon Plate',
    description: 'Grilled salmon with avocado, asparagus, and a side of mixed greens. Perfect for ketogenic diet.',
    nutrition: {
      calories: { value: '680', progress: 0.85, color: '#ff6b6b' },
      protein: { value: '42g', progress: 0.84, color: '#4ecdc4' },
      carbs: { value: '8g', progress: 0.13, color: '#45b7d1' },
      fat: { value: '52g', progress: 0.93, color: '#f9ca24' },
    },
    goal: 'Ideal for ketogenic diet followers. Very low carb, high fat content for ketosis.',
    category: 'Keto',
    difficulty: 'Medium',
    duration: '25 mins',
    tags: ['Keto', 'Low Carb', 'High Fat', 'Omega-3'],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z',
  },
  {
    id: 'diet_3',
    title: 'Vegan Power Bowl',
    description: 'Plant-based bowl with chickpeas, quinoa, roasted vegetables, and tahini dressing.',
    nutrition: {
      calories: { value: '450', progress: 0.56, color: '#ff6b6b' },
      protein: { value: '18g', progress: 0.36, color: '#4ecdc4' },
      carbs: { value: '65g', progress: 0.87, color: '#45b7d1' },
      fat: { value: '16g', progress: 0.4, color: '#f9ca24' },
    },
    goal: 'Plant-based nutrition with complete amino acids. Great for vegans and vegetarians.',
    category: 'Vegan',
    difficulty: 'Easy',
    duration: '20 mins',
    tags: ['Vegan', 'Plant-Based', 'High Fiber', 'Complete Protein'],
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    createdAt: '2024-01-03T00:00:00.000Z',
    updatedAt: '2024-01-03T00:00:00.000Z',
  },
];

// Mock user goals data
const MOCK_USER_GOALS = {
  targetWeight: 70.0,
  targetCalories: 2500,
  targetProtein: 150,
  targetCarbs: 300,
  targetFat: 83,
  fitnessGoal: 'build_muscle',
  targetDate: '2024-06-01',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

// Mock progress history
const MOCK_PROGRESS_HISTORY = [
  {
    id: '1',
    weight: 75.5,
    bodyFat: 18.5,
    muscleMass: 45.2,
    measurements: {
      chest: 95,
      waist: 80,
      hips: 95,
      arms: 32,
      thighs: 55,
    },
    notes: 'Starting point',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    weight: 74.8,
    bodyFat: 18.2,
    muscleMass: 45.8,
    measurements: {
      chest: 96,
      waist: 79,
      hips: 94,
      arms: 33,
      thighs: 56,
    },
    notes: 'Good progress on arms and chest',
    createdAt: '2024-01-15T00:00:00.000Z',
  },
  {
    id: '3',
    weight: 73.2,
    bodyFat: 17.8,
    muscleMass: 46.5,
    measurements: {
      chest: 97,
      waist: 77,
      hips: 93,
      arms: 34,
      thighs: 57,
    },
    notes: 'Muscle gain while losing fat',
    createdAt: '2024-02-01T00:00:00.000Z',
  },
];

// Helper function to get auth headers
const getAuthHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
});

export const mockApi = {
  login: async (email: string, password: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const token = MOCK_TOKENS[email];
    
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        age: user.age,
        weight: user.weight,
        weightUnit: user.weightUnit,
        height: user.height,
        heightUnit: user.heightUnit,
        gender: user.gender,
        fitnessGoal: user.fitnessGoal,
        gymActivity: user.gymActivity,
        dietFocus: user.dietFocus,
        isOnboardingCompleted: user.isOnboardingCompleted,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    };
  },

  register: async (userData: { name: string; email: string; password: string }) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      plan: 'basic',
      age: 25, // Default age
      weight: 70, // Default weight
      weightUnit: 'KG',
      height: 170, // Default height
      heightUnit: 'CM',
      gender: 'other' as const, // Default gender
      fitnessGoal: 'general_fitness', // Default goal
      gymActivity: '2_times_week', // Default activity
      dietFocus: 'balanced', // Default diet
      isOnboardingCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    MOCK_USERS.push(newUser);
    
    const token = `mock_token_${newUser.id}`;
    MOCK_TOKENS[userData.email] = token;
    
    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        plan: newUser.plan,
        age: newUser.age,
        weight: newUser.weight,
        weightUnit: newUser.weightUnit,
        height: newUser.height,
        heightUnit: newUser.heightUnit,
        gender: newUser.gender,
        fitnessGoal: newUser.fitnessGoal,
        gymActivity: newUser.gymActivity,
        dietFocus: newUser.dietFocus,
        isOnboardingCompleted: newUser.isOnboardingCompleted,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
      token,
    };
  },

  loginWithGoogle: async (idToken?: string) => {
    try {
      // Call real backend endpoint with the provided ID token
      const response = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken: idToken || 'mock_google_id_token', // Use real token if provided
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Google OAuth API call failed:', error);
      // Fallback to mock data for development
      return mockApi.fallbackGoogleAuth();
    }
  },

  loginWithApple: async (idToken?: string) => {
    try {
      // Call real backend endpoint with the provided ID token
      const response = await fetch(`${API_BASE_URL}/auth/apple`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken: idToken || 'mock_apple_id_token', // Use real token if provided
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Apple OAuth API call failed:', error);
      // Fallback to mock data for development
      return mockApi.fallbackAppleAuth();
    }
  },

  // Fallback methods for development
  fallbackGoogleAuth: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock Google user data
    const googleUser = {
      id: `google_user_${Date.now()}`,
      name: 'Google User',
      email: 'googleuser@example.com',
      plan: 'basic',
      age: 25,
      weight: 70,
      weightUnit: 'KG',
      height: 170,
      heightUnit: 'CM',
      gender: 'other' as const,
      fitnessGoal: 'general_fitness',
      gymActivity: '2_times_week',
      dietFocus: 'balanced',
      isOnboardingCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const token = `google_token_${googleUser.id}`;
    
    return {
      user: googleUser,
      token,
    };
  },

  fallbackAppleAuth: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock Apple user data
    const appleUser = {
      id: `apple_user_${Date.now()}`,
      name: 'Apple User',
      email: 'appleuser@example.com',
      plan: 'basic',
      age: 25,
      weight: 70,
      weightUnit: 'KG',
      height: 170,
      heightUnit: 'CM',
      gender: 'other' as const,
      fitnessGoal: 'general_fitness',
      gymActivity: '2_times_week',
      dietFocus: 'balanced',
      isOnboardingCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const token = `apple_token_${appleUser.id}`;
    
    return {
      user: appleUser,
      token,
    };
  },

  verifyToken: async (token: string) => {
    try {
      // Call real backend endpoint
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Token verification API call failed:', error);
      // Fallback to mock data for development
      return mockApi.fallbackVerifyToken(token);
    }
  },

  // Fallback method for token verification
  fallbackVerifyToken: async (token: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find user by token
    const email = Object.keys(MOCK_TOKENS).find(key => MOCK_TOKENS[key] === token);
    if (!email) {
      throw new Error('Invalid token');
    }
    
    const user = MOCK_USERS.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }
    
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        age: user.age,
        weight: user.weight,
        weightUnit: user.weightUnit,
        height: user.height,
        heightUnit: user.heightUnit,
        gender: user.gender,
        fitnessGoal: user.fitnessGoal,
        gymActivity: user.gymActivity,
        dietFocus: user.dietFocus,
        isOnboardingCompleted: user.isOnboardingCompleted,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  },

  // ===== USER PROFILE APIs =====
  getUserProfile: async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'GET',
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Get user profile API call failed:', error);
      // Fallback to mock data
      return mockApi.fallbackGetUserProfile(token);
    }
  },

  updateUserProfile: async (token: string, profileData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Update user profile API call failed:', error);
      // Fallback to mock data
      return mockApi.fallbackUpdateUserProfile(token, profileData);
    }
  },

  completeOnboarding: async (token: string, onboardingData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/onboarding/complete`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(onboardingData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Complete onboarding API call failed:', error);
      // Fallback to mock data
      return mockApi.fallbackCompleteOnboarding(token, onboardingData);
    }
  },

  // ===== NUTRITION APIs =====
  getDailyNutrition: async (token: string, date?: string) => {
    try {
      const url = date 
        ? `${API_BASE_URL}/nutrition/daily/${date}` 
        : `${API_BASE_URL}/nutrition/daily`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Get daily nutrition API call failed:', error);
      // Fallback to mock data
      return mockApi.fallbackGetDailyNutrition(date);
    }
  },

  getWeeklyNutrition: async (token: string, startDate: string, endDate: string) => {
    try {
      const queryParams = new URLSearchParams({
        startDate,
        endDate,
      });

      const response = await fetch(`${API_BASE_URL}/nutrition/weekly?${queryParams}`, {
        method: 'GET',
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Get weekly nutrition API call failed:', error);
      // Fallback to mock data
      return mockApi.fallbackGetWeeklyNutrition(startDate, endDate);
    }
  },

  addManualNutritionEntry: async (token: string, nutritionData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/nutrition/manual-entry`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(nutritionData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Add manual nutrition entry API call failed:', error);
      // Fallback to mock data
      return mockApi.fallbackAddManualNutritionEntry(nutritionData);
    }
  },

  // ===== FOOD HISTORY APIs =====
  getFoodHistory: async (token: string, params?: {
    date?: string;
    mealType?: string;
    limit?: number;
    offset?: number;
  }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params?.date) queryParams.append('date', params.date);
      if (params?.mealType) queryParams.append('mealType', params.mealType);
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.offset) queryParams.append('offset', params.offset.toString());

      const url = `${API_BASE_URL}/food/history${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Get food history API call failed:', error);
      // Fallback to mock data
      return mockApi.fallbackGetFoodHistory(params);
    }
  },

  // ===== FOOD SCANNING API =====
  scanFood: async (token: string, imageUri: string, mealType: string) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'food-image.jpg',
      } as any);
      formData.append('mealType', mealType);

      const response = await fetch(`${API_BASE_URL}/food/scan`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Scan food API call failed:', error);
      // Fallback to mock data
      return mockApi.fallbackScanFood(imageUri, mealType);
    }
  },

  // ===== DIET MANAGEMENT APIs =====
  getAllDiets: async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/diets`, {
        method: 'GET',
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Get all diets API call failed:', error);
      // Fallback to mock data
      return mockApi.fallbackGetAllDiets();
    }
  },

  getUserDiets: async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/diets/user`, {
        method: 'GET',
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Get user diets API call failed:', error);
      // Fallback to mock data
      return mockApi.fallbackGetUserDiets();
    }
  },

  addDietToUser: async (token: string, dietId: string, notes?: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/diets/user`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify({ dietId, notes }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Add diet to user API call failed:', error);
      // Fallback to mock data
      return mockApi.fallbackAddDietToUser(dietId, notes);
    }
  },

  removeDietFromUser: async (token: string, dietId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/diets/user/${dietId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Remove diet from user API call failed:', error);
      // Fallback to mock data
      return mockApi.fallbackRemoveDietFromUser(dietId);
    }
  },

  // ===== USER GOALS & PROGRESS APIs =====
  getUserGoals: async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/goals`, {
        method: 'GET',
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Get user goals API call failed:', error);
      // Fallback to mock data
      return mockApi.fallbackGetUserGoals();
    }
  },

  updateUserGoals: async (token: string, goals: {
    targetWeight?: number;
    targetCalories?: number;
    targetProtein?: number;
    targetCarbs?: number;
    targetFat?: number;
    fitnessGoal?: string;
    targetDate?: string;
  }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/goals`, {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify(goals),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Update user goals API call failed:', error);
      // Fallback to mock data
      return mockApi.fallbackUpdateUserGoals(goals);
    }
  },

  addProgressEntry: async (token: string, progress: {
    weight?: number;
    bodyFat?: number;
    muscleMass?: number;
    measurements?: {
      chest?: number;
      waist?: number;
      hips?: number;
      arms?: number;
      thighs?: number;
    };
    notes?: string;
  }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/progress`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(progress),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Add progress entry API call failed:', error);
      // Fallback to mock data
      return mockApi.fallbackAddProgressEntry(progress);
    }
  },

  getProgressHistory: async (token: string, params?: {
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
  }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params?.startDate) queryParams.append('startDate', params.startDate);
      if (params?.endDate) queryParams.append('endDate', params.endDate);
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.offset) queryParams.append('offset', params.offset.toString());

      const url = `${API_BASE_URL}/users/progress${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(token),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Get progress history API call failed:', error);
      // Fallback to mock data
      return mockApi.fallbackGetProgressHistory(params);
    }
  },

  // ===== FALLBACK METHODS FOR DEVELOPMENT =====
  
  // User profile fallbacks
  fallbackGetUserProfile: async (token: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find user by token (simplified for mock)
    const email = Object.keys(MOCK_TOKENS).find(key => MOCK_TOKENS[key] === token);
    if (!email) {
      throw new Error('Invalid token');
    }
    
    const user = MOCK_USERS.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }
    
    return {
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        age: user.age,
        weight: user.weight,
        weightUnit: user.weightUnit,
        height: user.height,
        heightUnit: user.heightUnit,
        gender: user.gender,
        fitnessGoal: user.fitnessGoal,
        gymActivity: user.gymActivity,
        dietFocus: user.dietFocus,
        isOnboardingCompleted: user.isOnboardingCompleted,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  },

  fallbackUpdateUserProfile: async (token: string, profileData: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find user by token
    const email = Object.keys(MOCK_TOKENS).find(key => MOCK_TOKENS[key] === token);
    if (!email) {
      throw new Error('Invalid token');
    }
    
    const user = MOCK_USERS.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Update user data
    Object.assign(user, profileData);
    user.updatedAt = new Date().toISOString();
    
    return {
      success: true,
      data: user,
    };
  },

  fallbackCompleteOnboarding: async (token: string, onboardingData: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find user by token
    const email = Object.keys(MOCK_TOKENS).find(key => MOCK_TOKENS[key] === token);
    if (!email) {
      throw new Error('Invalid token');
    }
    
    const user = MOCK_USERS.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Update user with onboarding data
    Object.assign(user, onboardingData);
    user.isOnboardingCompleted = true;
    user.updatedAt = new Date().toISOString();
    
    return {
      success: true,
      data: user,
    };
  },

  // Nutrition fallbacks
  fallbackGetDailyNutrition: async (date?: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      data: {
        date: date || new Date().toISOString().split('T')[0],
        ...MOCK_NUTRITION.daily,
      },
    };
  },

  fallbackGetWeeklyNutrition: async (startDate: string, endDate: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      data: MOCK_NUTRITION.weekly.filter(day => 
        day.date >= startDate && day.date <= endDate
      ),
    };
  },

  fallbackAddManualNutritionEntry: async (nutritionData: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newEntry = {
      id: `nutrition_${Date.now()}`,
      ...nutritionData,
      createdAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      data: newEntry,
    };
  },

  // Food history fallbacks
  fallbackGetFoodHistory: async (params?: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredHistory = [...MOCK_FOOD_HISTORY];
    
    if (params?.date) {
      filteredHistory = filteredHistory.filter(item => 
        item.consumedAt.startsWith(params.date)
      );
    }
    
    if (params?.mealType) {
      filteredHistory = filteredHistory.filter(item => 
        item.mealType === params.mealType
      );
    }
    
    const limit = params?.limit || 20;
    const offset = params?.offset || 0;
    const paginatedHistory = filteredHistory.slice(offset, offset + limit);
    
    return {
      success: true,
      data: paginatedHistory,
      pagination: {
        page: Math.floor(offset / limit) + 1,
        limit,
        total: filteredHistory.length,
        totalPages: Math.ceil(filteredHistory.length / limit),
        hasNext: offset + limit < filteredHistory.length,
        hasPrev: offset > 0,
      },
    };
  },

  // Food scan fallback
  fallbackScanFood: async (imageUri: string, mealType: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock AI analysis result
    const mockAnalysis = {
      id: `scan_${Date.now()}`,
      name: 'Grilled Chicken Breast',
      confidence: 0.89,
      nutrition: {
        calories: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6,
        fiber: 0,
        sugar: 0,
        sodium: 74,
      },
      mealType,
      imageUrl: imageUri,
      createdAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      data: mockAnalysis,
    };
  },

  // Diet fallbacks
  fallbackGetAllDiets: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      data: MOCK_DIETS,
    };
  },

  fallbackGetUserDiets: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return empty array for user diets initially
    return {
      success: true,
      data: [],
    };
  },

  fallbackAddDietToUser: async (dietId: string, notes?: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUserDiet = {
      id: `user_diet_${Date.now()}`,
      dietId,
      notes,
      addedAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      data: newUserDiet,
    };
  },

  fallbackRemoveDietFromUser: async (dietId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      message: 'Diet removed successfully',
    };
  },

  // User goals fallbacks
  fallbackGetUserGoals: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      data: MOCK_USER_GOALS,
    };
  },

  fallbackUpdateUserGoals: async (goals: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedGoals = {
      ...MOCK_USER_GOALS,
      ...goals,
      updatedAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      data: updatedGoals,
    };
  },

  // Progress fallbacks
  fallbackAddProgressEntry: async (progress: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newEntry = {
      id: `progress_${Date.now()}`,
      ...progress,
      createdAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      data: newEntry,
    };
  },

  fallbackGetProgressHistory: async (params?: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredHistory = [...MOCK_PROGRESS_HISTORY];
    
    if (params?.startDate) {
      filteredHistory = filteredHistory.filter(item => 
        item.createdAt >= params.startDate
      );
    }
    
    if (params?.endDate) {
      filteredHistory = filteredHistory.filter(item => 
        item.createdAt <= params.endDate
      );
    }
    
    const limit = params?.limit || 20;
    const offset = params?.offset || 0;
    const paginatedHistory = filteredHistory.slice(offset, offset + limit);
    
    return {
      success: true,
      data: paginatedHistory,
      pagination: {
        page: Math.floor(offset / limit) + 1,
        limit,
        total: filteredHistory.length,
        totalPages: Math.ceil(filteredHistory.length / limit),
        hasNext: offset + limit < filteredHistory.length,
        hasPrev: offset > 0,
      },
    };
  },
}; 