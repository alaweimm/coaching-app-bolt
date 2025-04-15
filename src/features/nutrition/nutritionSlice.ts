import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../api/apiClient';
import { API_ENDPOINTS } from '../../config/constants';
import type { Food, Meal, DailyLog, MealTemplate } from './types/nutrition.types';

interface NutritionState {
  foods: Food[];
  meals: Meal[];
  dailyLogs: DailyLog[];
  mealTemplates: MealTemplate[];
  loading: boolean;
  error: string | null;
}

const initialState: NutritionState = {
  foods: [],
  meals: [],
  dailyLogs: [],
  mealTemplates: [],
  loading: false,
  error: null,
};

export const fetchFoods = createAsyncThunk(
  'nutrition/fetchFoods',
  async () => {
    const response = await apiClient.get(API_ENDPOINTS.NUTRITION.FOODS);
    return response.data;
  }
);

export const fetchMealTemplates = createAsyncThunk(
  'nutrition/fetchMealTemplates',
  async () => {
    const response = await apiClient.get(API_ENDPOINTS.NUTRITION.TEMPLATES);
    return response.data;
  }
);

export const createDailyLog = createAsyncThunk(
  'nutrition/createDailyLog',
  async (log: Partial<DailyLog>) => {
    const response = await apiClient.post(API_ENDPOINTS.NUTRITION.MEALS, log);
    return response.data;
  }
);

const nutritionSlice = createSlice({
  name: 'nutrition',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoods.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.loading = false;
        state.foods = action.payload;
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch foods';
      })
      .addCase(fetchMealTemplates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMealTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.mealTemplates = action.payload;
      })
      .addCase(fetchMealTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch meal templates';
      })
      .addCase(createDailyLog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDailyLog.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyLogs = [...state.dailyLogs, action.payload];
      })
      .addCase(createDailyLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create daily log';
      });
  },
});

export const { clearError } = nutritionSlice.actions;
export default nutritionSlice.reducer;