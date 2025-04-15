import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NutritionDashboard from './components/NutritionDashboard';
import MealPlanner from './components/MealPlanner';
import FoodLibrary from './components/FoodLibrary';
import MacroCalculator from './components/MacroCalculator';

const Nutrition = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nutrition</h1>
      
      <Routes>
        <Route index element={<NutritionDashboard />} />
        <Route path="meal-planner" element={<MealPlanner />} />
        <Route path="food-library" element={<FoodLibrary />} />
        <Route path="macro-calculator" element={<MacroCalculator />} />
      </Routes>
    </div>
  );
};

export default Nutrition;