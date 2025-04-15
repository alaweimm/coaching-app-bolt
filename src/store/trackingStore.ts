import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { DailyLog, WeeklySummary, Supplement, HealthMetrics, TrainingProgram } from '../types/tracking';

interface TrackingState {
  dailyLogs: Record<string, DailyLog>;
  weeklySummaries: Record<string, WeeklySummary>;
  supplements: Supplement[];
  healthMetrics: HealthMetrics[];
  trainingPrograms: TrainingProgram[];
  
  // Daily Log Actions
  addDailyLog: (log: DailyLog) => void;
  updateDailyLog: (date: string, updates: Partial<DailyLog>) => void;
  getDailyLog: (date: string) => DailyLog | undefined;
  
  // Weekly Summary Actions
  generateWeeklySummary: (startDate: string) => WeeklySummary;
  getWeeklySummary: (startDate: string) => WeeklySummary | undefined;
  
  // Supplement Actions
  addSupplement: (supplement: Supplement) => void;
  updateSupplement: (id: string, updates: Partial<Supplement>) => void;
  deleteSupplement: (id: string) => void;
  getActiveCycle: () => Supplement[];
  
  // Health Metrics Actions
  addHealthMetrics: (metrics: HealthMetrics) => void;
  getHealthMetrics: (startDate: string, endDate: string) => HealthMetrics[];
  
  // Training Program Actions
  addTrainingProgram: (program: TrainingProgram) => void;
  updateTrainingProgram: (id: string, updates: Partial<TrainingProgram>) => void;
  getCurrentProgram: () => TrainingProgram | undefined;
}

export const useTrackingStore = create<TrackingState>()(
  persist(
    immer((set, get) => ({
      dailyLogs: {},
      weeklySummaries: {},
      supplements: [],
      healthMetrics: [],
      trainingPrograms: [],

      addDailyLog: (log) => {
        set((state) => {
          state.dailyLogs[log.date] = log;
        });
      },

      updateDailyLog: (date, updates) => {
        set((state) => {
          if (state.dailyLogs[date]) {
            state.dailyLogs[date] = {
              ...state.dailyLogs[date],
              ...updates,
            };
          }
        });
      },

      getDailyLog: (date) => {
        return get().dailyLogs[date];
      },

      generateWeeklySummary: (startDate) => {
        const state = get();
        // Implementation for calculating weekly summary
        const summary: WeeklySummary = {
          startDate,
          endDate: '', // Calculate end date
          compliance: {
            training: 0,
            cardio: 0,
            steps: 0,
            nutrition: 0,
            overall: 0,
          },
          averages: {
            mood: 0,
            sleep: 0,
            weight: 0,
          },
          macros: {
            protein: 0,
            carbs: 0,
            fats: 0,
            calories: 0,
            adherence: 0,
          },
          healthFlags: [],
        };
        
        // Calculate summary metrics
        // ... implementation details ...

        set((state) => {
          state.weeklySummaries[startDate] = summary;
        });

        return summary;
      },

      getWeeklySummary: (startDate) => {
        return get().weeklySummaries[startDate];
      },

      addSupplement: (supplement) => {
        set((state) => {
          state.supplements.push(supplement);
        });
      },

      updateSupplement: (id, updates) => {
        set((state) => {
          const index = state.supplements.findIndex(s => s.id === id);
          if (index !== -1) {
            state.supplements[index] = {
              ...state.supplements[index],
              ...updates,
            };
          }
        });
      },

      deleteSupplement: (id) => {
        set((state) => {
          state.supplements = state.supplements.filter(s => s.id !== id);
        });
      },

      getActiveCycle: () => {
        return get().supplements.filter(s => s.status === 'active');
      },

      addHealthMetrics: (metrics) => {
        set((state) => {
          state.healthMetrics.push(metrics);
        });
      },

      getHealthMetrics: (startDate, endDate) => {
        return get().healthMetrics.filter(
          m => m.date >= startDate && m.date <= endDate
        );
      },

      addTrainingProgram: (program) => {
        set((state) => {
          state.trainingPrograms.push(program);
        });
      },

      updateTrainingProgram: (id, updates) => {
        set((state) => {
          const index = state.trainingPrograms.findIndex(p => p.id === id);
          if (index !== -1) {
            state.trainingPrograms[index] = {
              ...state.trainingPrograms[index],
              ...updates,
            };
          }
        });
      },

      getCurrentProgram: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().trainingPrograms.find(
          p => p.startDate <= today && (!p.endDate || p.endDate >= today)
        );
      },
    })),
    {
      name: 'tracking-store',
      version: 1,
    }
  )
);