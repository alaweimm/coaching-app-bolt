import React, { useState } from 'react';
import { Plus, Save, X, Clock, Dumbbell, Play } from 'lucide-react';
import { useWorkoutStore } from '../store/workoutStore';
import { PixelCard } from '../../../components/ui/PixelCard';
import { PixelButton } from '../../../components/ui/PixelButton';
import { WorkoutRecommendations } from './WorkoutRecommendations';
import { WorkoutTracker } from './WorkoutTracker';
import { WorkoutAnalytics } from './WorkoutAnalytics';
import type { Exercise, WorkoutExercise, Workout } from '../types/workout.types';

export function WorkoutBuilder() {
  const { exercises, addWorkout } = useWorkoutStore();
  const [workoutName, setWorkoutName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<WorkoutExercise[]>([]);
  const [showExerciseList, setShowExerciseList] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);

  const handleAddExercise = (exercise: Exercise) => {
    setSelectedExercises([
      ...selectedExercises,
      {
        exercise,
        sets: [{ weight: 0, reps: 0, completed: false }],
        restPeriod: 90,
      },
    ]);
    setShowExerciseList(false);
  };

  const handleRemoveExercise = (index: number) => {
    setSelectedExercises(selectedExercises.filter((_, i) => i !== index));
  };

  const handleStartWorkout = () => {
    const workout: Workout = {
      id: crypto.randomUUID(),
      name: workoutName,
      type: 'custom',
      exercises: selectedExercises,
      duration: 0,
      intensity: 'moderate',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setActiveWorkout(workout);
  };

  const handleCompleteWorkout = (completedWorkout: Workout) => {
    addWorkout(completedWorkout);
    setWorkoutName('');
    setSelectedExercises([]);
    setActiveWorkout(null);
  };

  if (activeWorkout) {
    return (
      <div className="space-y-6">
        <WorkoutTracker
          workout={activeWorkout}
          onComplete={handleCompleteWorkout}
        />
        <WorkoutAnalytics />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <WorkoutRecommendations />

      <PixelCard>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Create Workout</h2>
          <PixelButton
            variant="primary"
            icon={<Play className="w-4 h-4" />}
            onClick={handleStartWorkout}
            disabled={!workoutName || selectedExercises.length === 0}
          >
            Start Workout
          </PixelButton>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Workout Name
          </label>
          <input
            type="text"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter workout name"
          />
        </div>

        <div className="space-y-4">
          {selectedExercises.map((exercise, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <h3 className="font-medium">{exercise.exercise.name}</h3>
                <p className="text-sm text-gray-500">
                  {exercise.sets.length} sets • {exercise.restPeriod}s rest
                </p>
              </div>
              <PixelButton
                variant="danger"
                size="sm"
                icon={<X className="w-4 h-4" />}
                onClick={() => handleRemoveExercise(index)}
              >
                Remove
              </PixelButton>
            </div>
          ))}

          <PixelButton
            variant="secondary"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setShowExerciseList(true)}
            className="w-full"
          >
            Add Exercise
          </PixelButton>
        </div>
      </PixelCard>

      {showExerciseList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <PixelCard className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Select Exercise</h3>
              <PixelButton
                variant="secondary"
                size="sm"
                icon={<X className="w-4 h-4" />}
                onClick={() => setShowExerciseList(false)}
              >
                Close
              </PixelButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exercises.map((exercise) => (
                <button
                  key={exercise.id}
                  onClick={() => handleAddExercise(exercise)}
                  className="p-4 border rounded-lg hover:bg-gray-50 text-left"
                >
                  <h4 className="font-medium">{exercise.name}</h4>
                  <p className="text-sm text-gray-500">{exercise.muscleGroups.join(', ')}</p>
                </button>
              ))}
            </div>
          </PixelCard>
        </div>
      )}
    </div>
  );
}