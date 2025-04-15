import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Utensils } from 'lucide-react';
import { useTrackingStore } from '../../../store/trackingStore';

export const MacroAnalysis = () => {
  const { dailyLogs } = useTrackingStore();

  const recentLogs = Object.values(dailyLogs)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7);

  const macroTrends = recentLogs.reverse().map(log => ({
    date: new Date(log.date).toLocaleDateString('en-US', { weekday: 'short' }),
    protein: log.macros.protein,
    carbs: log.macros.carbs,
    fats: log.macros.fats,
    calories: log.macros.calories,
  }));

  const averages = {
    protein: Math.round(recentLogs.reduce((sum, log) => sum + log.macros.protein, 0) / recentLogs.length),
    carbs: Math.round(recentLogs.reduce((sum, log) => sum + log.macros.carbs, 0) / recentLogs.length),
    fats: Math.round(recentLogs.reduce((sum, log) => sum + log.macros.fats, 0) / recentLogs.length),
    calories: Math.round(recentLogs.reduce((sum, log) => sum + log.macros.calories, 0) / recentLogs.length),
  };

  const pieData = [
    { name: 'Protein', value: averages.protein * 4, color: '#3B82F6' },
    { name: 'Carbs', value: averages.carbs * 4, color: '#10B981' },
    { name: 'Fats', value: averages.fats * 9, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Utensils className="w-6 h-6 text-purple-500 mr-2" />
        <h2 className="text-xl font-semibold">Macro Analysis</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-sm text-gray-500">Average Calories</h3>
          <p className="text-2xl font-bold mt-1">{averages.calories} kcal</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-sm text-gray-500">Average Protein</h3>
          <p className="text-2xl font-bold mt-1">{averages.protein}g</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-sm text-gray-500">Average Carbs</h3>
          <p className="text-2xl font-bold mt-1">{averages.carbs}g</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-sm text-gray-500">Average Fats</h3>
          <p className="text-2xl font-bold mt-1">{averages.fats}g</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-6">Macro Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-6">Macro Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={macroTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="protein"
                  name="Protein"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="carbs"
                  name="Carbs"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="fats"
                  name="Fats"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};