export interface SelfAssessment {
  // Physical Measurements
  weight: number;
  height: number;
  bodyFatPercentage: number;
  
  // Experience & Goals
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  experienceYears: number;
  primaryGoal: 'muscle_gain' | 'fat_loss' | 'strength' | 'maintenance';
  secondaryGoals: string[];
  
  // Health & Limitations
  medicalConditions: string[];
  injuries: string[];
  medications: string[];
  
  // Availability & Resources
  weeklyAvailability: number; // hours per week
  equipmentAccess: {
    gym: boolean;
    homeEquipment: string[];
    preferredLocation: 'gym' | 'home' | 'hybrid';
  };
  
  // Preferences
  preferredTrainingDays: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
  maxSessionDuration: number; // minutes
  cardioPreference: 'low' | 'moderate' | 'high';
}

export interface TrainingProgram {
  split: {
    name: string;
    daysPerWeek: number;
    focusAreas: string[];
  };
  
  workouts: {
    day: string;
    exercises: {
      name: string;
      sets: number;
      reps: string; // e.g., "8-12" or "5"
      restPeriod: number; // seconds
      notes: string;
    }[];
    duration: number; // minutes
  }[];
  
  progression: {
    type: 'linear' | 'undulating' | 'wave';
    incrementScheme: string;
    deloadFrequency: number; // weeks
  };
  
  cardio: {
    frequency: number; // sessions per week
    type: string[];
    duration: number; // minutes
    intensity: 'low' | 'moderate' | 'high';
  };
}

export interface NutritionProtocol {
  calories: {
    maintenance: number;
    target: number;
    deficit?: number;
    surplus?: number;
  };
  
  macros: {
    protein: number; // grams
    carbs: number;
    fats: number;
  };
  
  mealTiming: {
    mealsPerDay: number;
    schedule: {
      time: string;
      type: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'pre_workout' | 'post_workout';
      macroDistribution: {
        protein: number;
        carbs: number;
        fats: number;
      };
    }[];
  };
  
  supplementation: {
    name: string;
    dosage: string;
    timing: string;
    notes: string;
  }[];
}

export interface RecoveryProtocol {
  sleep: {
    targetHours: number;
    bedtime: string;
    wakeTime: string;
    optimizationTips: string[];
  };
  
  mobility: {
    frequency: number; // sessions per week
    duration: number; // minutes
    focusAreas: string[];
    exercises: {
      name: string;
      sets: number;
      duration: number; // seconds
      notes: string;
    }[];
  };
  
  stressManagement: {
    techniques: string[];
    frequency: string;
    duration: number; // minutes
  };
  
  activeRecovery: {
    activities: string[];
    frequency: number; // sessions per week
    duration: number; // minutes
    intensity: 'very_low' | 'low' | 'moderate';
  };
}