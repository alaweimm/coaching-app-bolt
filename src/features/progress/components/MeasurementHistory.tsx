import React from 'react';
import { Ruler, TrendingUp } from 'lucide-react';

const MeasurementHistory = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Measurement History</h2>
        <Ruler className="h-6 w-6 text-purple-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Latest Measurements</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Chest</span>
              <span className="font-medium">42"</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Waist</span>
              <span className="font-medium">32"</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Hips</span>
              <span className="font-medium">38"</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Progress Tracking</h3>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span className="text-gray-600 dark:text-gray-300">Measurement trends will be displayed here</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementHistory;