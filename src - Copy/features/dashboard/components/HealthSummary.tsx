import React from 'react';
import { Heart, Activity, Moon, Brain } from 'lucide-react';

export const HealthSummary = () => {
  const healthMetrics = [
    {
      label: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-100',
    },
    {
      label: 'Sleep',
      value: '7.5',
      unit: 'hrs',
      icon: Moon,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Activity',
      value: '8,432',
      unit: 'steps',
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Stress',
      value: 'Low',
      unit: '',
      icon: Brain,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="space-y-4">
      {healthMetrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div key={metric.label} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${metric.bgColor} mr-3`}>
                <Icon className={`w-5 h-5 ${metric.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {metric.value}
                  {metric.unit && <span className="text-sm text-gray-500 ml-1">{metric.unit}</span>}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className={`h-2 w-24 bg-gray-200 rounded-full overflow-hidden`}>
                <div
                  className={`h-full ${metric.bgColor} rounded-full`}
                  style={{ width: '75%' }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};