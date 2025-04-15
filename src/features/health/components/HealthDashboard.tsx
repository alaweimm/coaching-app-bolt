import React from 'react';
import { useTrackingStore } from '../../../store/trackingStore';
import { calculateHealthRisk } from '../../../utils/calculations';
import { Brain, Heart, Activity, Scale } from 'lucide-react';
import { HealthMetricsChart } from './HealthMetricsChart';
import { HealthAlerts } from './HealthAlerts';
import { MetricCard } from './MetricCard';

export const HealthDashboard = () => {
  const { dailyLogs, healthMetrics } = useTrackingStore();

  // Calculate averages from the last 7 days
  const last7Days = Object.values(dailyLogs)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7);

  const averages = {
    mood: last7Days.reduce((sum, log) => sum + (log.mood || 0), 0) / last7Days.length || 0,
    energy: last7Days.reduce((sum, log) => sum + (log.health?.energy || 0), 0) / last7Days.length || 0,
    stress: last7Days.reduce((sum, log) => sum + (log.health?.stress || 0), 0) / last7Days.length || 0,
    sleep: last7Days.reduce((sum, log) => sum + (log.sleep?.duration || 0), 0) / last7Days.length || 0,
  };

  const healthRisk = calculateHealthRisk({
    sleepAvg: averages.sleep,
    stressAvg: averages.stress,
    energyAvg: averages.energy,
    moodAvg: averages.mood,
    digestiveAvg: last7Days.reduce((sum, log) => sum + (log.health?.digestion || 0), 0) / last7Days.length || 0,
  });

  const metrics = [
    {
      label: 'Mood Score',
      value: averages.mood.toFixed(1),
      icon: Brain,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Energy Level',
      value: averages.energy.toFixed(1),
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Sleep Quality',
      value: `${averages.sleep.toFixed(1)}h`,
      icon: Heart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      label: 'Stress Level',
      value: averages.stress.toFixed(1),
      icon: Scale,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Health Monitoring</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HealthMetricsChart data={last7Days} />
        <HealthAlerts risk={healthRisk} />
      </div>
    </div>
  );
};

export default HealthDashboard;