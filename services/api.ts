// Mock API service for development
// Replace this with real API calls when backend is ready

const MOCK_USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    plan: 'premium',
    age: 28,
    weight: 75,
    weightUnit: 'KG',
    height: 180,
    heightUnit: 'CM',
    gender: 'male',
    fitnessGoal: 'build_muscle',
    gymActivity: '3-4_times',
    dietFocus: 'high_protein',
    isOnboardingCompleted: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    plan: 'basic',
    age: 25,
    weight: 60,
    weightUnit: 'KG',
    height: 165,
    heightUnit: 'CM',
    gender: 'female',
    fitnessGoal: 'lose_weight',
    gymActivity: '1-2_times',
    dietFocus: 'low_carb',
    isOnboardingCompleted: false,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

const MOCK_TOKENS = {
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
    
    const token = MOCK_TOKENS[email as keyof typeof MOCK_TOKENS];
    
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
      id: String(MOCK_USERS.length + 1),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      isOnboardingCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    MOCK_USERS.push(newUser);
    MOCK_TOKENS[userData.email as keyof typeof MOCK_TOKENS] = `mock_token_${newUser.id}_${Date.now()}`;
    
    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isOnboardingCompleted: newUser.isOnboardingCompleted,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
      token: MOCK_TOKENS[userData.email as keyof typeof MOCK_TOKENS],
    };
  },

  verifyToken: async (token: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find user by token
    const email = Object.keys(MOCK_TOKENS).find(key => MOCK_TOKENS[key as keyof typeof MOCK_TOKENS] === token);
    
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