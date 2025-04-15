import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface Client {
  id: string;
  name: string;
  email: string;
  startWeight: number;
  currentWeight: number;
  goalWeight: number;
  startDate: string;
}

interface ProgressMetricsProps {
  client: Client;
}

const ProgressMetrics = ({ client }: ProgressMetricsProps) => {
  // Sample weight data - in a real app, this would come from your database
  const weightData = [
    { week: 0, weight: client.startWeight, goal: client.goalWeight },
    { week: 1, weight: 85.2, goal: client.goalWeight },
    { week: 2, weight: 84.8, goal: client.goalWeight },
    { week: 3, weight: client.currentWeight, goal: client.goalWeight }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Progress Metrics</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weightData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Weight"
            />
            <Line
              type="monotone"
              dataKey="goal"
              stroke="#F59E0B"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Goal"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressMetrics;