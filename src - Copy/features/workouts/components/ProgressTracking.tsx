import React, { useState } from 'react';
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
import { useWorkoutStore } from '../store/workoutStore';
import { PixelCard } from '../../../components/ui/PixelCard';
import { PixelButton } from '../../../components/ui/PixelButton';
import { PixelInput } from '../../../components/ui/PixelInput';
import { Camera, Scale, TrendingUp, Save } from 'lucide-react';
import type { ProgressMetrics } from '../types/workout.types';

export function ProgressTracking() {
  const { progressMetrics, addProgressMetrics } = useWorkoutStore();
  const [measurements, setMeasurements] = useState({
    weight: '',
    bodyFat: '',
    chest: '',
    waist: '',
    hips: '',
    arms: '',
    thighs: '',
  });

  const handleSaveProgress = () => {
    const metrics: ProgressMetrics = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      measurements: {
        weight: parseFloat(measurements.weight),
        bodyFat: measurements.bodyFat ? parseFloat(measurements.bodyFat) : undefined,
        chest: measurements.chest ? parseFloat(measurements.chest) : undefined,
        waist: measurements.waist ? parseFloat(measurements.waist) : undefined,
        hips: measurements.hips ? parseFloat(measurements.hips) : undefined,
        arms: measurements.arms ? parseFloat(measurements.arms) : undefined,
        thighs: measurements.thighs ? parseFloat(measurements.thighs) : undefined,
      },
      progress: {
        weight: 0,
        strength: 0,
        endurance: 0,
        flexibility: 0,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addProgressMetrics(metrics);
    setMeasurements({
      weight: '',
      bodyFat: '',
      chest: '',
      waist: '',
      hips: '',
      arms: '',
      thighs: '',
    });
  };

  const chartData = progressMetrics
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(metric => ({
      date: new Date(metric.date).toLocaleDateString(),
      weight: metric.measurements.weight,
      bodyFat: metric.measurements.bodyFat,
    }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <PixelCard>
          <h2 className="text-xl font-semibold mb-6">Progress Chart</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Weight (kg)"
                />
                <Line
                  type="monotone"
                  dataKey="bodyFat"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Body Fat %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </PixelCard>

        {/* Measurements Form */}
        <PixelCard>
          <h2 className="text-xl font-semibold mb-6">Record Measurements</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <PixelInput
                label="Weight (kg)"
                type="number"
                step="0.1"
                value={measurements.weight}
                onChange={(e) =>
                  setMeasurements({ ...measurements, weight: e.target.value })
                }
                icon={<Scale className="w-4 h-4 text-gray-400" />}
              />
              <PixelInput
                label="Body Fat %"
                type="number"
                step="0.1"
                value={measurements.bodyFat}
                onChange={(e) =>
                  setMeasurements({ ...measurements, bodyFat: e.target.value })
                }
                icon={<TrendingUp className="w-4 h-4 text-gray-400" />}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <PixelInput
                label="Chest (cm)"
                type="number"
                step="0.1"
                value={measurements.chest}
                onChange={(e) =>
                  setMeasurements({ ...measurements, chest: e.target.value })
                }
              />
              <PixelInput
                label="Waist (cm)"
                type="number"
                step="0.1"
                value={measurements.waist}
                onChange={(e) =>
                  setMeasurements({ ...measurements, waist: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <PixelInput
                label="Hips (cm)"
                type="number"
                step="0.1"
                value={measurements.hips}
                onChange={(e) =>
                  setMeasurements({ ...measurements, hips: e.target.value })
                }
              />
              <PixelInput
                label="Arms (cm)"
                type="number"
                step="0.1"
                value={measurements.arms}
                onChange={(e) =>
                  setMeasurements({ ...measurements, arms: e.target.value })
                }
              />
            </div>

            <PixelInput
              label="Thighs (cm)"
              type="number"
              step="0.1"
              value={measurements.thighs}
              onChange={(e) =>
                setMeasurements({ ...measurements, thighs: e.target.value })
              }
            />

            <div className="flex justify-end space-x-4">
              <PixelButton
                variant="secondary"
                icon={<Camera className="w-4 h-4" />}
              >
                Add Photos
              </PixelButton>
              <PixelButton
                variant="primary"
                icon={<Save className="w-4 h-4" />}
                onClick={handleSaveProgress}
                disabled={!measurements.weight}
              >
                Save Progress
              </PixelButton>
            </div>
          </div>
        </PixelCard>
      </div>
    </div>
  );
}