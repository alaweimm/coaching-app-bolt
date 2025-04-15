import { calculateTDEE } from '../../utils/calculations';
import type { Client } from '../../types/client';
import type { Exercise, WorkoutTemplate } from '../../features/workouts/types/workout.types';

interface WorkoutRecommendation {
  template: WorkoutTemplate;
  intensity: 'light' | 'moderate' | 'high';
  modifications: string[];
  recoveryGuidelines: {
    restDays: number;
    sleepRecommendation: number;
    hydrationGoal: number;
  };
}

export function generateWorkoutRecommendation(
  client: Client,
  exerciseHistory: Exercise[],
  recentMetrics: {
    sleep: number;
    stress: number;
    soreness: number;
    energy: number;
  }
): WorkoutRecommendation {
  // Calculate base metrics
  const tdee = calculateTDEE(
    client.currentWeight,
    client.height,
    client.age,
    client.activityLevel
  );

  // Determine workout intensity based on recovery metrics
  const recoveryScore = (
    recentMetrics.sleep +
    (10 - recentMetrics.stress) +
    (10 - recentMetrics.soreness) +
    recentMetrics.energy
  ) / 4;

  const intensity: 'light' | 'moderate' | 'high' = 
    recoveryScore >= 7 ? 'high' :
    recoveryScore >= 5 ? 'moderate' : 'light';

  // Generate recovery guidelines
  const recoveryGuidelines = {
    restDays: intensity === 'high' ? 1 : 2,
    sleepRecommendation: 8,
    hydrationGoal: client.currentWeight * 0.033, // 33ml per kg of body weight
  };

  // Select appropriate workout template based on goals and recovery
  const template: WorkoutTemplate = {
    id: crypto.randomUUID(),
    name: `${intensity.charAt(0).toUpperCase() + intensity.slice(1)} Intensity Workout`,
    type: 'custom',
    description: `Personalized workout based on current recovery metrics`,
    exercises: [], // This would be populated based on the client's goals and recovery
    estimatedDuration: 60,
    difficulty: intensity === 'high' ? 'advanced' : 'intermediate',
    tags: [intensity, client.goal],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Generate modifications based on metrics
  const modifications = [];
  if (recentMetrics.soreness > 7) {
    modifications.push('Reduce weights by 10-20%');
    modifications.push('Focus on mobility work');
  }
  if (recentMetrics.energy < 5) {
    modifications.push('Increase rest periods between sets');
    modifications.push('Reduce overall volume');
  }

  return {
    template,
    intensity,
    modifications,
    recoveryGuidelines,
  };
}