import React from 'react';

const complianceData = {
  nutrition: 85,
  training: 92,
  cardio: 93,
  steps: 90
};

const WeeklyCompliance = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Weekly Compliance</h2>
      <div className="space-y-4">
        {Object.entries(complianceData).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 capitalize">
                {key}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {value}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  value >= 90
                    ? 'bg-green-500'
                    : value >= 75
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCompliance;