import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Heart } from 'lucide-react';

export const VitalsOverview = () => {
  const vitalsData = [
    { date: '2024-02-01', hr: 68, bp: '120/80', hrv: 45 },
    { date: '2024-02-02', hr: 72, bp: '118/78', hrv: 42 },
    { date: '2024-02-03', hr: 65, bp: '122/82', hrv: 48 },
    { date: '2024-02-04', hr: 70, bp: '119/79', hrv: 44 },
    { date: '2024-02-05', hr: 67, bp: '121/81', hrv: 46 }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-4">
        <Heart className="w-5 h-5 text-red-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Vitals Overview</h3>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Heart Rate</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">67 bpm</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Blood Pressure</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">121/81</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">HRV</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">46 ms</p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={vitalsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="hr" stroke="#EF4444" strokeWidth={2} />
            <Line type="monotone" dataKey="hrv" stroke="#8B5CF6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};