import React from 'react';
import { Activity, TrendingUp, Apple, Heart } from 'lucide-react';

export const MetricsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-2">
          <Activity className="w-5 h-5 text-blue-500 mr-2" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Activity</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">2,345</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">calories burned</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-2">
          <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Progress</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">85%</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">weekly goals met</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-2">
          <Apple className="w-5 h-5 text-red-500 mr-2" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Nutrition</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">1,890</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">calories consumed</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-2">
          <Heart className="w-5 h-5 text-purple-500 mr-2" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Health</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">72</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">resting heart rate</p>
      </div>
    </div>
  );
};