import React, { useState, useEffect } from 'react';
import { Play, Pause, Save, Clock, Activity, BarChart2 } from 'lucide-react';
import { useWorkoutStore } from '../store/workoutStore';
import { PixelCard } from '../../../components/ui/PixelCard';
import { PixelButton } from '../../../components/ui/PixelButton';
import { PixelProgress } from '../../../components/ui/PixelProgress';
import type { Workout, WorkoutSet } from '../types/workout.types';

interface WorkoutTrackerProps {
  workout: Workout;
  onComplete: (workout: Workout) => void;
}

export function WorkoutTracker({ workout, onComplete }: WorkoutTrackerProps) {
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [exerciseProgress, setExerciseProgress] = useState<Record<string, WorkoutSet[]>>({});
  const [restTimer, setRestTimer] = useState(0);

  // Timer effect for workout duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, startTime]);

  // Rest timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (restTimer > 0 && isActive) {
      interval = setInterval(() => {
        setRestTimer(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [restTimer, isActive]);

  const startWorkout = () => {
    setIsActive(true);
    setStartTime(new Date());
  };

  const pauseWorkout = () => {
    setIsActive(false);
  };

  const completeSet = (weight: number, reps: number) => {
    const exercise = workout.exercises[currentExerciseIndex];
    const updatedSets = exerciseProgress[exercise.exercise.id] || [];
    
    updatedSets[currentSetIndex] = {
      weight,
      reps,
      completed: true,
      notes: '',
    };

    setExerciseProgress({
      ...exerciseProgress,
      [exercise.exercise.id]: updatedSets,
    });

    // Start rest timer
    setRestTimer(exercise.restPeriod);

    // Move to next set or exercise
    if (currentSetIndex < exercise.sets.length - 1) {
      setCurrentSetIndex(currentSetIndex + 1);
    } else if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSetIndex(0);
    }
  };

  const handleComplete = () => {
    const endTime = new Date();
    const completedWorkout = {
      ...workout,
      completed: true,
      duration: Math.floor((endTime.getTime() - (startTime?.getTime() || 0)) / 1000),
      exercises: workout.exercises.map(exercise => ({
        ...exercise,
        sets: exerciseProgress[exercise.exercise.id] || exercise.sets,
      })),
    };
    onComplete(completedWorkout);
  };

  const currentExercise = workout.exercises[currentExerciseIndex];
  const progress = (currentExerciseIndex * 100) / workout.exercises.length;

  return (
    <div className="space-y-6">
      <PixelCard>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">{workout.name}</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              <span>{Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}</span>
            </div>
            {!isActive ? (
              <PixelButton
                variant="success"
                icon={<Play className="w-4 h-4" />}
                onClick={startWorkout}
              >
                Start
              </PixelButton>
            ) : (
              <PixelButton
                variant="warning"
                icon={<Pause className="w-4 h-4" />}
                onClick={pauseWorkout}
              >
                Pause
              </PixelButton>
            )}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <PixelProgress value={progress} max={100} variant="primary" />
        </div>

        {currentExercise && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg">{currentExercise.exercise.name}</h3>
              {restTimer > 0 && (
                <div className="text-sm font-medium text-blue-600">
                  Rest: {restTimer}s
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentExercise.sets.map((set, index) => {
                const completedSet = exerciseProgress[currentExercise.exercise.id]?.[index];
                return (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg ${
                      index === currentSetIndex ? 'border-blue-500 bg-blue-50' : ''
                    } ${completedSet?.completed ? 'bg-green-50' : ''}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Set {index + 1}</span>
                      {completedSet?.completed && (
                        <Activity className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Weight"
                        className="px-2 py-1 border rounded"
                        disabled={index !== currentSetIndex || !isActive || restTimer > 0}
                        value={completedSet?.weight || ''}
                        onChange={(e) => {
                          const updatedSets = exerciseProgress[currentExercise.exercise.id] || [];
                          updatedSets[index] = {
                            ...updatedSets[index],
                            weight: parseFloat(e.target.value),
                          };
                          setExerciseProgress({
                            ...exerciseProgress,
                            [currentExercise.exercise.id]: updatedSets,
                          });
                        }}
                      />
                      <input
                        type="number"
                        placeholder="Reps"
                        className="px-2 py-1 border rounded"
                        disabled={index !== currentSetIndex || !isActive || restTimer > 0}
                        value={completedSet?.reps || ''}
                        onChange={(e) => {
                          const updatedSets = exerciseProgress[currentExercise.exercise.id] || [];
                          updatedSets[index] = {
                            ...updatedSets[index],
                            reps: parseInt(e.target.value),
                          };
                          setExerciseProgress({
                            ...exerciseProgress,
                            [currentExercise.exercise.id]: updatedSets,
                          });
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Target: {currentExercise.sets.length} sets
              </div>
              <PixelButton
                variant="primary"
                size="sm"
                onClick={() => {
                  const currentSet = exerciseProgress[currentExercise.exercise.id]?.[currentSetIndex];
                  completeSet(currentSet?.weight || 0, currentSet?.reps || 0);
                }}
                disabled={!isActive || restTimer > 0}
              >
                Complete Set
              </PixelButton>
            </div>
          </div>
        )}

        {currentExerciseIndex === workout.exercises.length - 1 && 
         currentSetIndex === currentExercise.sets.length - 1 && (
          <PixelButton
            variant="success"
            icon={<Save className="w-4 h-4" />}
            onClick={handleComplete}
            className="w-full mt-6"
          >
            Complete Workout
          </PixelButton>
        )}
      </PixelCard>

      <PixelCard>
        <h3 className="text-lg font-semibold mb-4">Exercise Notes</h3>
        <textarea
          className="w-full p-2 border rounded-lg"
          rows={4}
          placeholder="Add notes about form, difficulty, or other observations..."
          value={exerciseProgress[currentExercise.exercise.id]?.[currentSetIndex]?.notes || ''}
          onChange={(e) => {
            const updatedSets = exerciseProgress[currentExercise.exercise.id] || [];
            updatedSets[currentSetIndex] = {
              ...updatedSets[currentSetIndex],
              notes: e.target.value,
            };
            setExerciseProgress({
              ...exerciseProgress,
              [currentExercise.exercise.id]: updatedSets,
            });
          }}
        />
      </PixelCard>
    </div>
  );
}