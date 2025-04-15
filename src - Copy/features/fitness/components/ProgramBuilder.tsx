import React, { useState } from 'react';
import type { SelfAssessment, TrainingProgram, NutritionProtocol, RecoveryProtocol } from '../types/assessment';
import { calculateTDEE, calculateProteinTarget, calculateMacroSplit } from '../../../utils/calculations';

interface ProgramBuilderProps {
  assessment: SelfAssessment;
}

export const ProgramBuilder: React.FC<ProgramBuilderProps> = ({ assessment }) => {
  const [program, setProgram] = useState<{
    training: TrainingProgram;
    nutrition: NutritionProtocol;
    recovery: RecoveryProtocol;
  } | null>(null);

  const generateProgram = () => {
    // Calculate TDEE and macros
    const tdee = calculateTDEE(
      assessment.weight,
      assessment.height,
      30, // Default age if not provided
      assessment.weeklyAvailability >= 6 ? 'very' : 'moderate'
    );

    const targetCalories = assessment.primaryGoal === 'muscle_gain'
      ? tdee + 300
      : assessment.primaryGoal === 'fat_loss'
      ? tdee - 500
      : tdee;

    const proteinTarget = calculateProteinTarget(
      assessment.weight,
      assessment.primaryGoal
    );

    const macros = calculateMacroSplit(
      targetCalories,
      proteinTarget,
      assessment.primaryGoal
    );

    // Generate training split based on availability
    const trainingDays = Math.min(
      Math.floor(assessment.weeklyAvailability / 1.5),
      6
    );

    const split = generateTrainingSplit(trainingDays, assessment.fitnessLevel);

    setProgram({
      training: {
        split: {
          name: split.name,
          daysPerWeek: trainingDays,
          focusAreas: split.focusAreas,
        },
        workouts: split.workouts,
        progression: {
          type: assessment.fitnessLevel === 'beginner' ? 'linear' : 'undulating',
          incrementScheme: '2.5-5kg per week',
          deloadFrequency: 6,
        },
        cardio: {
          frequency: assessment.primaryGoal === 'fat_loss' ? 4 : 2,
          type: ['walking', 'cycling', 'swimming'],
          duration: 30,
          intensity: assessment.cardioPreference,
        },
      },
      nutrition: {
        calories: {
          maintenance: tdee,
          target: targetCalories,
          deficit: assessment.primaryGoal === 'fat_loss' ? 500 : undefined,
          surplus: assessment.primaryGoal === 'muscle_gain' ? 300 : undefined,
        },
        macros,
        mealTiming: {
          mealsPerDay: 4,
          schedule: generateMealSchedule(4, macros),
        },
        supplementation: [
          {
            name: 'Whey Protein',
            dosage: '25-30g',
            timing: 'Post-workout and between meals',
            notes: 'High-quality protein source for muscle recovery',
          },
          {
            name: 'Creatine Monohydrate',
            dosage: '5g',
            timing: 'Daily, with any meal',
            notes: 'Supports strength and muscle growth',
          },
        ],
      },
      recovery: {
        sleep: {
          targetHours: 8,
          bedtime: '22:00',
          wakeTime: '06:00',
          optimizationTips: [
            'Dark room',
            'Cool temperature',
            'No screens 1 hour before bed',
            'Consistent schedule',
          ],
        },
        mobility: {
          frequency: 3,
          duration: 15,
          focusAreas: ['hips', 'shoulders', 'ankles', 'thoracic spine'],
          exercises: [
            {
              name: 'Hip Flexor Stretch',
              sets: 2,
              duration: 30,
              notes: 'Focus on posterior pelvic tilt',
            },
            {
              name: 'Wall Slides',
              sets: 3,
              duration: 30,
              notes: 'Maintain contact with wall',
            },
          ],
        },
        stressManagement: {
          techniques: [
            'Deep breathing',
            'Progressive relaxation',
            'Light walking',
            'Meditation',
          ],
          frequency: 'daily',
          duration: 10,
        },
        activeRecovery: {
          activities: ['walking', 'swimming', 'yoga'],
          frequency: 2,
          duration: 30,
          intensity: 'low',
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      <button
        onClick={generateProgram}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Generate Program
      </button>

      {program && (
        <div className="space-y-6">
          {/* Training Program */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Training Program</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Split Details</h3>
                <p className="text-gray-600">
                  {program.training.split.name} - {program.training.split.daysPerWeek} days per week
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Progression</h3>
                <p className="text-gray-600">
                  {program.training.progression.type} progression with deload every{' '}
                  {program.training.progression.deloadFrequency} weeks
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Cardio</h3>
                <p className="text-gray-600">
                  {program.training.cardio.frequency}x per week,{' '}
                  {program.training.cardio.duration} minutes at {program.training.cardio.intensity} intensity
                </p>
              </div>
            </div>
          </div>

          {/* Nutrition Protocol */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Nutrition Protocol</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Caloric Targets</h3>
                <p className="text-gray-600">
                  Maintenance: {program.nutrition.calories.maintenance} kcal
                  <br />
                  Target: {program.nutrition.calories.target} kcal
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Macronutrients</h3>
                <p className="text-gray-600">
                  Protein: {program.nutrition.macros.protein}g
                  <br />
                  Carbs: {program.nutrition.macros.carbs}g
                  <br />
                  Fats: {program.nutrition.macros.fats}g
                </p>
              </div>
            </div>
          </div>

          {/* Recovery Protocol */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recovery Protocol</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Sleep</h3>
                <p className="text-gray-600">
                  Target: {program.recovery.sleep.targetHours} hours
                  <br />
                  {program.recovery.sleep.bedtime} - {program.recovery.sleep.wakeTime}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Mobility Work</h3>
                <p className="text-gray-600">
                  {program.recovery.mobility.frequency}x per week,{' '}
                  {program.recovery.mobility.duration} minutes
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Active Recovery</h3>
                <p className="text-gray-600">
                  {program.recovery.activeRecovery.frequency}x per week,{' '}
                  {program.recovery.activeRecovery.duration} minutes at{' '}
                  {program.recovery.activeRecovery.intensity} intensity
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function generateTrainingSplit(days: number, level: string) {
  // Implementation would include detailed workout plans
  // This is a simplified version
  return {
    name: 'Upper/Lower Split',
    focusAreas: ['Upper Body', 'Lower Body'],
    workouts: [],
  };
}

function generateMealSchedule(meals: number, macros: any) {
  // Implementation would distribute macros across meals
  // This is a simplified version
  return [];
}