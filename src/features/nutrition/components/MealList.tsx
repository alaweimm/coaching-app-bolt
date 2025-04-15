import React from 'react';
import { Clock, Edit2, Trash2 } from 'lucide-react';

export const MealList = () => {
  const meals = [
    {
      id: 1,
      time: '08:00',
      name: 'Breakfast',
      foods: [
        { name: 'Oatmeal', amount: '100g', calories: 389 },
        { name: 'Banana', amount: '1 medium', calories: 105 },
        { name: 'Protein Shake', amount: '1 scoop', calories: 120 }
      ]
    },
    {
      id: 2,
      time: '12:00',
      name: 'Lunch',
      foods: [
        { name: 'Chicken Breast', amount: '200g', calories: 330 },
        { name: 'Brown Rice', amount: '150g', calories: 165 },
        { name: 'Mixed Vegetables', amount: '200g', calories: 70 }
      ]
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today's Meals</h3>

      <div className="space-y-4">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-gray-500 mr-2" />
                <span className="font-medium text-gray-900 dark:text-white">{meal.time}</span>
                <span className="mx-2">-</span>
                <span className="font-medium text-gray-900 dark:text-white">{meal.name}</span>
              </div>
              <div className="flex space-x-2">
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <Edit2 className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {meal.foods.map((food, index) => (
                <div
                  key={index}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-600 dark:text-gray-300">{food.name} ({food.amount})</span>
                  <span className="text-gray-900 dark:text-white">{food.calories} kcal</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};