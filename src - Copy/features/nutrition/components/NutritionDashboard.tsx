import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Book, Calculator, Plus } from 'lucide-react';
import { MacroTracker } from './MacroTracker';
import { MealList } from './MealList';
import { WaterTracker } from './WaterTracker';

const NutritionDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Nutrition Overview</h2>
        <div className="flex space-x-4">
          <Link
            to="/nutrition/meal-planner"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Meal
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/nutrition/meal-planner"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Utensils className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Meal Planner</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">Plan and track your daily meals</p>
        </Link>

        <Link
          to="/nutrition/food-library"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Book className="w-5 h-5 text-green-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Food Library</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">Browse and manage your food database</p>
        </Link>

        <Link
          to="/nutrition/macro-calculator"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Calculator className="w-5 h-5 text-purple-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Macro Calculator</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">Calculate your macro needs</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MacroTracker />
        <WaterTracker />
      </div>

      <MealList />
    </div>
  );
};

export default NutritionDashboard;