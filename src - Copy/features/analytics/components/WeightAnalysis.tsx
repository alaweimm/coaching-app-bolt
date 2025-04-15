import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { format, subMonths } from 'date-fns';
import { Scale, TrendingDown, TrendingUp } from 'lucide-react';
import { useTrackingStore } from '../../../store/trackingStore';

export const WeightAnalysis = () => {
  const { healthMetrics } = useTrackingStore();
  const [timeframe, setTimeframe] = React.useState<'1m' | '3m' | '6m' | '1y'>('3m');

  const timeframeMap = {
    '1m': 1,
    '3m': 3,
    '6m': 6,
    '1y': 12,
  };

  const startDate = subMonths(new Date(), timeframeMap[timeframe]);

  const filteredData = healthMetrics
    .filter(metric => new Date(metric.date) >= startDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const chartData = filteredData.map(metric => ({
    date: format(new Date(metric.date), 'MMM d'),
    weight: metric.weight,
  }));

  const firstWeight = filteredData[0]?.weight;
  const lastWeight = filteredData[filteredData.length - 1]?.weight;
  const weightChange = lastWeight && firstWeight ? lastWeight - firstWeight : 0;
  const weeklyRate = (weightChange / (timeframeMap[timeframe] * 4.345)).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Scale className="w-6 h-6 text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold">Weight Analysis</h2>
        </div>
        <div className="flex space-x-2">
          {(['1m', '3m', '6m', '1y'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                timeframe === t
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-2">
            <Scale className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="text-sm text-gray-500">Current Weight</h3>
          </div>
          <p className="text-2xl font-bold">{lastWeight?.toFixed(1)} kg</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-2">
            {weightChange < 0 ? (
              <TrendingDown className="w-5 h-5 text-green-500 mr-2" />
            ) : (
              <TrendingUp className="w-5 h-5 text-red-500 mr-2" />
            )}
            <h3 className="text-sm text-gray-500">Total Change</h3>
          </div>
          <p className={`text-2xl font-bold ${
            weightChange < 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {weightChange.toFixed(1)} kg
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className="text-sm text-gray-500">Weekly Rate</h3>
          </div>
          <p className="text-2xl font-bold">{weeklyRate} kg/week</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-6">Weight Trend</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
              <Tooltip />
              <ReferenceLine
                y={firstWeight}
                stroke="#9CA3AF"
                strokeDasharray="3 3"
                label={{ value: 'Start', position: 'right' }}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};