import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { format } from 'date-fns';

export interface DailyEntry {
  date: string;
  training: {
    completed: boolean;
    type: string;
  };
  cardio: {
    minutes: number;
    type: string;
  };
  steps: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
    compliance: number;
  };
  sleep: {
    hours: number;
    quality: number;
  };
  mood: number;
  notes: string;
}

interface WeeklyPlanningState {
  entries: Record<string, DailyEntry>;
  addEntry: (date: string, entry: Partial<DailyEntry>) => void;
  updateEntry: (date: string, entry: Partial<DailyEntry>) => void;
  getWeeklySummary: (startDate: string) => {
    compliance: number;
    avgMood: number;
    avgSleep: number;
    macroAdherence: number;
  };
}

const defaultEntry: DailyEntry = {
  date: '',
  training: {
    completed: false,
    type: '',
  },
  cardio: {
    minutes: 0,
    type: '',
  },
  steps: 0,
  macros: {
    protein: 0,
    carbs: 0,
    fats: 0,
    compliance: 0,
  },
  sleep: {
    hours: 0,
    quality: 0,
  },
  mood: 0,
  notes: '',
};

export const useWeeklyPlanning = create<WeeklyPlanningState>()(
  immer((set, get) => ({
    entries: {},
    
    addEntry: (date, entry) => {
      set((state) => {
        state.entries[date] = {
          ...defaultEntry,
          date,
          ...entry,
        };
      });
    },

    updateEntry: (date, entry) => {
      set((state) => {
        if (state.entries[date]) {
          state.entries[date] = {
            ...state.entries[date],
            ...entry,
          };
        }
      });
    },

    getWeeklySummary: (startDate) => {
      const entries = Object.values(get().entries).filter(
        (entry) => entry.date >= startDate && 
        entry.date <= format(new Date(startDate).setDate(new Date(startDate).getDate() + 6), 'yyyy-MM-dd')
      );

      if (entries.length === 0) {
        return {
          compliance: 0,
          avgMood: 0,
          avgSleep: 0,
          macroAdherence: 0,
        };
      }

      const summary = entries.reduce(
        (acc, entry) => ({
          compliance: acc.compliance + (entry.training.completed ? 1 : 0),
          mood: acc.mood + entry.mood,
          sleep: acc.sleep + entry.sleep.hours,
          macroAdherence: acc.macroAdherence + entry.macros.compliance,
        }),
        { compliance: 0, mood: 0, sleep: 0, macroAdherence: 0 }
      );

      return {
        compliance: (summary.compliance / entries.length) * 100,
        avgMood: summary.mood / entries.length,
        avgSleep: summary.sleep / entries.length,
        macroAdherence: summary.macroAdherence / entries.length,
      };
    },
  }))
);