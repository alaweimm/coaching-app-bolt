import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain } from 'lucide-react';

const StressLevels = () => {
  const stressData = [
    { time: '6AM', level: 2 },
    { time: '9AM', level: 4 },
    { time: '12PM', level: 6 },
    { time: '3PM', level: 5 },
    { time: '6PM', level: 3 },
    { time: '9PM', level: 2 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Stress Monitoring</h2>
        <Brain className="h-6 w-6 text-purple-500" />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-4">
          <Brain className="w-5 h-5 text-purple-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Daily Stress Levels</h3>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="level" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Average</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">3.7</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Peak</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">6.0</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Recovery</p>
            <p className="text-xl font-semibold text-purple-500">Good</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressLevels;