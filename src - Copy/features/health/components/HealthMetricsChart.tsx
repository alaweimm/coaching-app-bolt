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
} from 'recharts';
import { format } from 'date-fns';
import type { DailyLog } from '../../../types/tracking';

interface HealthMetricsChartProps {
  data: DailyLog[];
}

export const HealthMetricsChart: React.FC<HealthMetricsChartProps> = ({ data }) => {
  const chartData = data.map((log) => ({
    date: format(new Date(log.date), 'MMM d'),
    mood: log.mood || 0,
    energy: log.health?.energy || 0,
    stress: log.health?.stress || 0,
    sleep: log.sleep?.duration || 0,
  }));

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Health Metrics Trend</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Mood"
            />
            <Line
              type="monotone"
              dataKey="energy"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Energy"
            />
            <Line
              type="monotone"
              dataKey="stress"
              stroke="#EF4444"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Stress"
            />
            <Line
              type="monotone"
              dataKey="sleep"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Sleep"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};