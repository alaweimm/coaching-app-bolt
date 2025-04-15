export interface DailyLog {
  id: string;
  date: string;
  training: {
    completed: boolean;
    type: string;
    notes: string;
  };
  cardio: {
    duration: number;
    type: string;
    intensity: 'low' | 'medium' | 'high';
  };
  steps: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
    compliance: number;
  };
  sleep: {
    duration: number;
    quality: number;
  };
  mood: number;
  health: {
    digestion: number;
    energy: number;
    soreness: number;
    libido: number;
    stress: number;
    notes: string;
  };
  notes: string;
}

export interface WeeklySummary {
  startDate: string;
  endDate: string;
  compliance: {
    training: number;
    cardio: number;
    steps: number;
    nutrition: number;
    overall: number;
  };
  averages: {
    mood: number;
    sleep: number;
    weight: number;
  };
  macros: {
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
    adherence: number;
  };
  healthFlags: Array<{
    metric: string;
    value: number;
    threshold: number;
    severity: 'low' | 'medium' | 'high';
  }>;
}

export interface Supplement {
  id: string;
  name: string;
  category: 'compound' | 'ancillary' | 'supplement';
  phase: 'blast' | 'cruise' | 'trt' | 'off';
  dosage: number;
  unit: string;
  frequency: string;
  timing: string;
  startDate: string;
  endDate?: string;
  notes: string;
  status: 'active' | 'planned' | 'completed';
}

export interface HealthMetrics {
  weight: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  restingHeartRate: number;
  bodyFat?: number;
  date: string;
  notes: string;
}

export interface TrainingProgram {
  id: string;
  name: string;
  type: 'strength' | 'hypertrophy' | 'maintenance';
  frequency: number;
  exercises: Array<{
    name: string;
    sets: number;
    reps: string;
    weight?: number;
    rpe?: number;
    notes?: string;
  }>;
  startDate: string;
  endDate?: string;
  notes: string;
}