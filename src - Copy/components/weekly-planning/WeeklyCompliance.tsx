import React, { useState } from 'react';
import { Edit2, Save, X } from 'lucide-react';
import { useTrackingStore } from '../../store/trackingStore';

interface ComplianceData {
  nutrition: number;
  training: number;
  cardio: number;
  steps: number;
}

const WeeklyCompliance = () => {
  const { dailyLogs, updateDailyLog } = useTrackingStore();
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<ComplianceData>({
    nutrition: 85,
    training: 92,
    cardio: 93,
    steps: 90
  });

  // Calculate compliance from daily logs
  const calculateCompliance = () => {
    if (Object.keys(dailyLogs).length === 0) return editData;

    const logs = Object.values(dailyLogs);
    return {
      nutrition: logs.reduce((sum, log) => sum + (log.macros?.compliance || 0), 0) / logs.length,
      training: (logs.filter(log => log.training?.completed).length / logs.length) * 100,
      cardio: logs.reduce((sum, log) => sum + (log.cardio?.duration || 0), 0) / logs.length,
      steps: logs.reduce((sum, log) => sum + (log.steps || 0), 0) / logs.length
    };
  };

  const complianceData = calculateCompliance();

  const handleEdit = () => {
    setEditData(complianceData);
    setEditing(true);
  };

  const handleSave = () => {
    // Update the latest daily log with new compliance data
    const today = new Date().toISOString().split('T')[0];
    updateDailyLog(today, {
      macros: { compliance: editData.nutrition },
      training: { completed: editData.training >= 90 },
      cardio: { duration: editData.cardio },
      steps: editData.steps
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleChange = (metric: keyof ComplianceData, value: number) => {
    setEditData(prev => ({
      ...prev,
      [metric]: Math.min(Math.max(0, value), 100) // Clamp between 0 and 100
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Weekly Compliance</h2>
        {!editing ? (
          <button
            onClick={handleEdit}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Edit2 className="w-4 h-4 text-gray-600" />
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="p-2 hover:bg-green-100 rounded-full text-green-600"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-red-100 rounded-full text-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {Object.entries(editing ? editData : complianceData).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 capitalize">
                {key}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {editing ? (
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => handleChange(key as keyof ComplianceData, Number(e.target.value))}
                    className="w-16 text-right border rounded px-1"
                    min="0"
                    max="100"
                  />
                ) : (
                  `${Math.round(value)}%`
                )}
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