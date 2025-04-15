import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useWorkoutStore } from '../store/workoutStore';
import { PixelCard } from '../../../components/ui/PixelCard';
import { Activity, TrendingUp, Clock, Weight } from 'lucide-react';

export function WorkoutAnalytics() {
  const { logs, progressMetrics } = useWorkoutStore();

  // Calculate volume trends
  const volumeData = logs.map(log => ({
    date: new Date(log.date).toLocaleDateString(),
    volume: log.metrics.totalVolume,
    sets: log.metrics.totalSets,
  }));

  // Calculate strength progress
  const strengthData = logs.reduce((acc, log) => {
    log.metrics.personalRecords.forEach(pr => {
      if (!acc[pr.exercise]) {
        acc[pr.exercise] = [];
      }
      acc[pr.exercise].push({
        date: new Date(log.date).toLocaleDateString(),
        value: pr.value,
      });
    });
    return acc;
  }, {} as Record<string, Array<{ date: string; value: number }>>);

  // Calculate workout duration trends
  const durationData = logs.map(log => {
    const start = new Date(log.startTime);
    const end = new Date(log.endTime);
    return {
      date: new Date(log.date).toLocaleDateString(),
      duration: (end.getTime() - start.getTime()) / (1000 * 60), // Convert to minutes
    };
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PixelCard>
          <div className="flex items-center mb-4">
            <Activity className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className="font-medium">Weekly Volume</h3>
          </div>
          <p className="text-2xl font-bold">
            {logs[logs.length - 1]?.metrics.totalVolume.toLocaleString()} kg
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {volumeData.length > 1 && (
              <>
                {volumeData[volumeData.length - 1].volume > volumeData[volumeData.length - 2].volume
                  ? '↑'
                  : '↓'} 
                vs last week
              </>
            )}
          </p>
        </PixelCard>

        <PixelCard>
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
            <h3 className="font-medium">Personal Records</h3>
          </div>
          <p className="text-2xl font-bold">
            {logs.reduce((sum, log) => sum + log.metrics.personalRecords.length, 0)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Lifetime PRs
          </p>
        </PixelCard>

        <PixelCard>
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 text-purple-500 mr-2" />
            <h3 className="font-medium">Avg. Duration</h3>
          </div>
          <p className="text-2xl font-bold">
            {Math.round(
              durationData.reduce((sum, { duration }) => sum + duration, 0) / durationData.length
            )} min
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Per workout
          </p>
        </PixelCard>

        <PixelCard>
          <div className="flex items-center mb-4">
            <Weight className="w-5 h-5 text-red-500 mr-2" />
            <h3 className="font-medium">Total Sets</h3>
          </div>
          <p className="text-2xl font-bold">
            {logs[logs.length - 1]?.metrics.totalSets}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            This week
          </p>
        </PixelCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PixelCard>
          <h3 className="text-lg font-semibold mb-4">Volume Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="volume"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Volume (kg)"
                />
                <Line
                  type="monotone"
                  dataKey="sets"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Total Sets"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </PixelCard>

        <PixelCard>
          <h3 className="text-lg font-semibold mb-4">Duration Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={durationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="duration"
                  fill="#8B5CF6"
                  name="Duration (min)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </PixelCard>

        {Object.entries(strengthData).map(([exercise, data]) => (
          <PixelCard key={exercise}>
            <h3 className="text-lg font-semibold mb-4">{exercise} Progress</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#EF4444"
                    strokeWidth={2}
                    name="Weight (kg)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </PixelCard>
        ))}
      </div>
    </div>
  );
}