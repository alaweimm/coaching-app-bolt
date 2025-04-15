import { BaseEntity } from '../../../shared/types/common.types';

export interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface Food extends BaseEntity {
  name: string;
  brand?: string;
  servingSize: number;
  servingUnit: string;
  macros: Macros;
  category: string;
}

export interface MealFood {
  food: Food;
  quantity: number;
  notes?: string;
}

export interface Meal extends BaseEntity {
  name: string;
  time: string;
  foods: MealFood[];
  totalMacros: Macros;
  notes?: string;
}

export interface DailyLog extends BaseEntity {
  date: string;
  meals: Meal[];
  targetMacros: Macros;
  actualMacros: Macros;
  compliance: number;
  notes: {
    hunger: number;
    energy: number;
    digestion: number;
    comments: string;
  };
}

export interface MealTemplate extends BaseEntity {
  name: string;
  description?: string;
  foods: MealFood[];
  totalMacros: Macros;
  tags: string[];
}