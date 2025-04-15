import { combineReducers } from '@reduxjs/toolkit';
import nutritionReducer from '../features/nutrition/nutritionSlice';
import trainingReducer from '../features/training/trainingSlice';
import healthReducer from '../features/health/healthSlice';
import protocolReducer from '../features/protocols/protocolSlice';
import supplementReducer from '../features/supplements/supplementSlice';

export const rootReducer = combineReducers({
  nutrition: nutritionReducer,
  training: trainingReducer,
  health: healthReducer,
  protocols: protocolReducer,
  supplements: supplementReducer,
});