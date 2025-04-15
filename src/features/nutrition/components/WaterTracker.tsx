import React from 'react';
import { Droplet } from 'lucide-react';

export const WaterTracker = () => {
  const target = 3000; // ml
  const current = 2100; // ml
  const percentage = (current / target) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-4">
        <Droplet className="w-5 h-5 text-blue-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Water Intake</h3>
      </div>

      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600">
              {percentage.toFixed(0)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
          <div
            style={{ width: `${percentage}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
          ></div>
        </div>
        <div className="text-center">
          <span className="text-xl font-bold text-gray-900 dark:text-white">{current}ml</span>
          <span className="text-gray-500 dark:text-gray-400"> / {target}ml</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-6">
        {[250, 500, 750, 1000].map((amount) => (
          <button
            key={amount}
            className="px-2 py-1 text-sm bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-200 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800"
          >
            +{amount}ml
          </button>
        ))}
      </div>
    </div>
  );
};