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
}; 