import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

export const MeasurementSummary = () => {
  const measurements = [
    { name: 'Chest', current: 104, previous: 105, unit: 'cm' },
    { name: 'Waist', current: 88, previous: 90, unit: 'cm' },
    { name: 'Hips', current: 97, previous: 98, unit: 'cm' },
    { name: 'Arms', current: 38, previous: 37.5, unit: 'cm' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Measurement Changes
      </h3>

      <div className="space-y-4">
        {measurements.map((measurement) => {
          const change = measurement.current - measurement.previous;
          const isPositive = change > 0;
          
          return (
            <div key={measurement.name} className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{measurement.name}</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {measurement.current} {measurement.unit}
                </p>
              </div>
              
              <div className={`flex items-center ${
                isPositive ? 'text-red-500' : 'text-green-500'
              }`}>
                {isPositive ? (
                  <ArrowUp className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDown className="w-4 h-4 mr-1" />
                )}
                <span className="font-medium">
                  {Math.abs(change)} {measurement.unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};