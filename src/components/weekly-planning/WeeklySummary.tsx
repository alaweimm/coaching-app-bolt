import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Trophy, TrendingUp, Moon, Brain } from 'lucide-react';

interface WeeklySummaryProps {
  summary: {
    compliance: number;
    avgMood: number;
    avgSleep: number;
    macroAdherence: number;
  };
}

const defaultSummary = {
  compliance: 0,
  avgMood: 0,
  avgSleep: 0,
  macroAdherence: 0,
};

export const WeeklySummary: React.FC<WeeklySummaryProps> = ({ summary = defaultSummary }) => {
  // Ensure we have valid numbers to work with
  const safeValues = {
    compliance: Number.isFinite(summary.compliance) ? summary.compliance : 0,
    avgMood: Number.isFinite(summary.avgMood) ? summary.avgMood : 0,
    avgSleep: Number.isFinite(summary.avgSleep) ? summary.avgSleep : 0,
    macroAdherence: Number.isFinite(summary.macroAdherence) ? summary.macroAdherence : 0,
  };

  const metrics = [
    {
      label: 'Overall Compliance',
      value: `${Math.round(safeValues.compliance)}%`,
      icon: Trophy,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Average Mood',
      value: safeValues.avgMood.toFixed(1),
      icon: Brain,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Average Sleep',
      value: `${safeValues.avgSleep.toFixed(1)}h`,
      icon: Moon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      label: 'Macro Adherence',
      value: `${Math.round(safeValues.macroAdherence)}%`,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const chartData = [
    { name: 'Compliance', value: safeValues.compliance },
    { name: 'Mood', value: (safeValues.avgMood / 10) * 100 },
    { name: 'Sleep', value: (safeValues.avgSleep / 8) * 100 },
    { name: 'Macros', value: safeValues.macroAdherence },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Weekly Summary</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="p-4 rounded-lg border border-gray-100"
          >
            <div className="flex items-center mb-2">
              <div
                className={`p-2 rounded-lg ${metric.bgColor} ${metric.color} mr-3`}
              >
                <metric.icon className="w-5 h-5" />
              </div>
              <span className="text-sm text-gray-600">{metric.label}</span>
            </div>
            <div className="text-2xl font-bold">{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};