import React from 'react';
import { Moon, Clock } from 'lucide-react';

export const SleepQuality = () => {
  const sleepData = {
    duration: 7.5,
    quality: 85,
    deepSleep: 2.3,
    remSleep: 1.8,
    lightSleep: 3.4,
    sleepScore: 88
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Moon className="w-5 h-5 text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sleep Quality</h3>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 text-gray-500 mr-1" />
          <span className="text-sm text-gray-500">Last night</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Sleep</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{sleepData.duration}h</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Sleep Score</p>
            <p className="text-2xl font-bold text-blue-500">{sleepData.sleepScore}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Deep Sleep</span>
              <span className="font-medium text-gray-900 dark:text-white">{sleepData.deepSleep}h</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '35%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">REM Sleep</span>
              <span className="font-medium text-gray-900 dark:text-white">{sleepData.remSleep}h</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Light Sleep</span>
              <span className="font-medium text-gray-900 dark:text-white">{sleepData.lightSleep}h</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};