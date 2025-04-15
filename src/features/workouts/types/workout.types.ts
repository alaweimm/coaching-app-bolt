import { BaseEntity } from '../../../shared/types/common.types';

export type ExerciseType = 'strength' | 'cardio' | 'flexibility';
export type MuscleGroup = 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core' | 'full_body';
export type WorkoutSplit = 'full_body' | 'upper_lower' | 'push_pull_legs' | 'custom';

export interface Exercise extends BaseEntity {
  name: string;
  type: ExerciseType;
  muscleGroups: MuscleGroup[];
  equipment: string[];
  description: string;
  notes?: string;
  videoUrl?: string;
}

export interface WorkoutSet {
  weight?: number;
  reps?: number;
  duration?: number; // For cardio/time-based exercises
  distance?: number; // For cardio exercises
  rpe?: number; // Rate of Perceived Exertion
  completed: boolean;
  notes?: string;
}

export interface WorkoutExercise {
  exercise: Exercise;
  sets: WorkoutSet[];
  restPeriod: number; // Rest period in seconds
  superset?: WorkoutExercise;
}

export interface Workout extends BaseEntity {
  name: string;
  type: WorkoutSplit;
  exercises: WorkoutExercise[];
  duration: number; // Duration in minutes
  intensity: 'light' | 'moderate' | 'high';
  notes?: string;
  completed: boolean;
}

export interface WorkoutTemplate extends BaseEntity {
  name: string;
  type: WorkoutSplit;
  description: string;
  exercises: Array<{
    exercise: Exercise;
    defaultSets: number;
    defaultReps: number;
    restPeriod: number;
  }>;
  estimatedDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

export interface WorkoutLog extends BaseEntity {
  workout: Workout;
  date: string;
  startTime: string;
  endTime: string;
  energyLevel: number;
  mood: number;
  notes?: string;
  metrics: {
    totalVolume: number;
    totalSets: number;
    totalReps: number;
    personalRecords: Array<{
      exercise: string;
      metric: 'weight' | 'reps' | 'duration';
      value: number;
    }>;
  };
}

export interface ProgressMetrics extends BaseEntity {
  date: string;
  measurements: {
    weight: number;
    bodyFat?: number;
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
  };
  progress: {
    weight: number;
    strength: number;
    endurance: number;
    flexibility: number;
  };
  photos?: string[];
  notes?: string;
}