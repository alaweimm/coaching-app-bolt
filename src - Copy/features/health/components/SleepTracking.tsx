import React from 'react';
import { Activity, Moon } from 'lucide-react';

const SleepTracking = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Sleep Tracking</h2>
        <Moon className="h-6 w-6 text-blue-500" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Sleep Quality</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Hours Slept</span>
              <span className="font-medium">8h 15m</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Sleep Score</span>
              <span className="font-medium">85%</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Sleep Activity</h3>
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-green-500" />
            <span className="text-gray-600 dark:text-gray-300">Sleep patterns will be tracked here</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepTracking;