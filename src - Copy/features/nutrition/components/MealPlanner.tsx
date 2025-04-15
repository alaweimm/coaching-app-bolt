import React from 'react';
import { Calendar } from 'lucide-react';

const MealPlanner = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Meal Planner</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          Plan Meals
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <p className="text-gray-600 dark:text-gray-300">Plan and schedule your meals for the week</p>
      </div>
    </div>
  );
};

export default MealPlanner;