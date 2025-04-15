import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

export const MacroTracker = () => {
  const macroData = [
    { name: 'Protein', value: 150, target: 180, color: '#3B82F6' },
    { name: 'Carbs', value: 200, target: 250, color: '#10B981' },
    { name: 'Fats', value: 55, target: 60, color: '#F59E0B' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Macro Tracking</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={macroData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {macroData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {macroData.map((macro) => (
          <div key={macro.name} className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">{macro.name}</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {macro.value}g / {macro.target}g
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};