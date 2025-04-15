import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { DailyLog } from '../../../types/tracking';

interface MacroBreakdownProps {
  logs: DailyLog[];
}

export const MacroBreakdown: React.FC<MacroBreakdownProps> = ({ logs }) => {
  const data = logs.map(log => ({
    date: new Date(log.date).toLocaleDateString('en-US', { weekday: 'short' }),
    protein: log.macros.protein,
    carbs: log.macros.carbs,
    fats: log.macros.fats,
  }));

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Macro Nutrient Breakdown</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="protein" name="Protein" fill="#3B82F6" />
            <Bar dataKey="carbs" name="Carbs" fill="#10B981" />
            <Bar dataKey="fats" name="Fats" fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};