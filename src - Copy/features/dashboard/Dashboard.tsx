import React from 'react';
import { Activity, TrendingUp, Apple, Moon, Heart } from 'lucide-react';
import { QuickEntry } from './components/QuickEntry';
import { MetricsGrid } from './components/MetricsGrid';
import { HealthSummary } from './components/HealthSummary';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <QuickEntry />
      </div>

      <MetricsGrid />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Today's Activity</h2>
          {/* Activity content */}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Progress Overview</h2>
          {/* Progress content */}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Activity className="w-5 h-5 text-blue-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Workout Summary</h2>
          </div>
          {/* Workout summary content */}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Apple className="w-5 h-5 text-green-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Nutrition Overview</h2>
          </div>
          {/* Nutrition overview content */}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Heart className="w-5 h-5 text-red-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Health Metrics</h2>
          </div>
          <HealthSummary />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;