import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { defaultExercises } from '../data/defaultExercises';
import type {
  Exercise,
  Workout,
  WorkoutTemplate,
  WorkoutLog,
  ProgressMetrics
} from '../types/workout.types';

interface WorkoutState {
  exercises: Exercise[];
  workouts: Workout[];
  templates: WorkoutTemplate[];
  logs: WorkoutLog[];
  progressMetrics: ProgressMetrics[];
  
  // Exercise Actions
  addExercise: (exercise: Exercise) => void;
  updateExercise: (id: string, exercise: Partial<Exercise>) => void;
  deleteExercise: (id: string) => void;
  
  // Workout Actions
  addWorkout: (workout: Workout) => void;
  updateWorkout: (id: string, workout: Partial<Workout>) => void;
  deleteWorkout: (id: string) => void;
  completeWorkout: (id: string, log: WorkoutLog) => void;
  
  // Template Actions
  addTemplate: (template: WorkoutTemplate) => void;
  updateTemplate: (id: string, template: Partial<WorkoutTemplate>) => void;
  deleteTemplate: (id: string) => void;
  
  // Progress Actions
  addProgressMetrics: (metrics: ProgressMetrics) => void;
  updateProgressMetrics: (id: string, metrics: Partial<ProgressMetrics>) => void;
  getProgressHistory: (startDate: string, endDate: string) => ProgressMetrics[];
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    immer((set, get) => ({
      exercises: defaultExercises,
      workouts: [],
      templates: [],
      logs: [],
      progressMetrics: [],

      addExercise: (exercise) => {
        set((state) => {
          state.exercises.push(exercise);
        });
      },

      updateExercise: (id, exercise) => {
        set((state) => {
          const index = state.exercises.findIndex(e => e.id === id);
          if (index !== -1) {
            state.exercises[index] = { ...state.exercises[index], ...exercise };
          }
        });
      },

      deleteExercise: (id) => {
        set((state) => {
          state.exercises = state.exercises.filter(e => e.id !== id);
        });
      },

      addWorkout: (workout) => {
        set((state) => {
          state.workouts.push(workout);
        });
      },

      updateWorkout: (id, workout) => {
        set((state) => {
          const index = state.workouts.findIndex(w => w.id === id);
          if (index !== -1) {
            state.workouts[index] = { ...state.workouts[index], ...workout };
          }
        });
      },

      deleteWorkout: (id) => {
        set((state) => {
          state.workouts = state.workouts.filter(w => w.id !== id);
        });
      },

      completeWorkout: (id, log) => {
        set((state) => {
          // Update workout status
          const workoutIndex = state.workouts.findIndex(w => w.id === id);
          if (workoutIndex !== -1) {
            state.workouts[workoutIndex].completed = true;
          }
          // Add workout log
          state.logs.push(log);
        });
      },

      addTemplate: (template) => {
        set((state) => {
          state.templates.push(template);
        });
      },

      updateTemplate: (id, template) => {
        set((state) => {
          const index = state.templates.findIndex(t => t.id === id);
          if (index !== -1) {
            state.templates[index] = { ...state.templates[index], ...template };
          }
        });
      },

      deleteTemplate: (id) => {
        set((state) => {
          state.templates = state.templates.filter(t => t.id !== id);
        });
      },

      addProgressMetrics: (metrics) => {
        set((state) => {
          state.progressMetrics.push(metrics);
        });
      },

      updateProgressMetrics: (id, metrics) => {
        set((state) => {
          const index = state.progressMetrics.findIndex(m => m.id === id);
          if (index !== -1) {
            state.progressMetrics[index] = {
              ...state.progressMetrics[index],
              ...metrics
            };
          }
        });
      },

      getProgressHistory: (startDate, endDate) => {
        return get().progressMetrics.filter(
          m => m.date >= startDate && m.date <= endDate
        );
      },
    })),
    {
      name: 'workout-store',
      version: 1,
    }
  )
);