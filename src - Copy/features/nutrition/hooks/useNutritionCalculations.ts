import { useMemo } from 'react';
import type { Macros, MealFood } from '../types/nutrition.types';

export function useNutritionCalculations() {
  const calculateMealMacros = (foods: MealFood[]): Macros => {
    return foods.reduce(
      (total, { food, quantity }) => ({
        calories: total.calories + (food.macros.calories * quantity),
        protein: total.protein + (food.macros.protein * quantity),
        carbs: total.carbs + (food.macros.carbs * quantity),
        fats: total.fats + (food.macros.fats * quantity),
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  };

  const calculateDailyCompliance = (target: Macros, actual: Macros): number => {
    const calorieCompliance = Math.min(actual.calories / target.calories, 1);
    const proteinCompliance = Math.min(actual.protein / target.protein, 1);
    const carbsCompliance = Math.min(actual.carbs / target.carbs, 1);
    const fatsCompliance = Math.min(actual.fats / target.fats, 1);

    return Math.round(
      ((calorieCompliance + proteinCompliance + carbsCompliance + fatsCompliance) / 4) * 100
    );
  };

  const formatMacros = (macros: Macros) => ({
    calories: Math.round(macros.calories),
    protein: Math.round(macros.protein),
    carbs: Math.round(macros.carbs),
    fats: Math.round(macros.fats),
  });

  return {
    calculateMealMacros: useMemo(() => calculateMealMacros, []),
    calculateDailyCompliance: useMemo(() => calculateDailyCompliance, []),
    formatMacros: useMemo(() => formatMacros, []),
  };
}