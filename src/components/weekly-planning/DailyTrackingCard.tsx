import React from 'react';
import { format } from 'date-fns';
import {
  Check,
  X,
  Moon,
  Activity,
  Footprints,
  Utensils,
  Smile,
  Edit3,
  Heart,
  Brain,
} from 'lucide-react';
import type { DailyLog } from '../../types/tracking';

interface DailyTrackingCardProps {
  date: string;
  entry: Partial<DailyLog>;
  onUpdate: (date: string, entry: Partial<DailyLog>) => void;
  isLocked: boolean;
}

export const DailyTrackingCard: React.FC<DailyTrackingCardProps> = ({
  date,
  entry,
  onUpdate,
  isLocked,
}) => {
  const handleTrainingToggle = () => {
    if (isLocked) return;
    onUpdate(date, {
      training: {
        ...entry.training,
        completed: !entry.training?.completed,
      },
    });
  };

  const handleInputChange = (
    field: keyof DailyLog,
    value: any,
    nestedField?: string
  ) => {
    if (isLocked) return;
    if (nestedField) {
      onUpdate(date, {
        [field]: {
          ...entry[field],
          [nestedField]: value,
        },
      });
    } else {
      onUpdate(date, { [field]: value });
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 space-y-4 ${isLocked ? 'opacity-75' : ''}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {format(new Date(date), 'EEEE, MMM d')}
        </h3>
        <button
          onClick={handleTrainingToggle}
          disabled={isLocked}
          className={`p-2 rounded-full ${
            entry.training?.completed
              ? 'bg-green-100 text-green-600'
              : 'bg-gray-100 text-gray-400'
          } ${isLocked ? 'cursor-not-allowed' : 'hover:bg-opacity-80'}`}
        >
          {entry.training?.completed ? (
            <Check className="w-5 h-5" />
          ) : (
            <X className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Activity className="w-4 h-4 mr-2" />
            <span className="text-sm">Cardio</span>
          </div>
          <input
            type="number"
            value={entry.cardio?.duration || 0}
            onChange={(e) =>
              handleInputChange('cardio', {
                ...entry.cardio,
                duration: parseInt(e.target.value),
              })
            }
            disabled={isLocked}
            className="w-full px-3 py-2 border rounded-md disabled:bg-gray-50"
            placeholder="Minutes"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Footprints className="w-4 h-4 mr-2" />
            <span className="text-sm">Steps</span>
          </div>
          <input
            type="number"
            value={entry.steps || 0}
            onChange={(e) =>
              handleInputChange('steps', parseInt(e.target.value))
            }
            disabled={isLocked}
            className="w-full px-3 py-2 border rounded-md disabled:bg-gray-50"
            placeholder="Step count"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Moon className="w-4 h-4 mr-2" />
            <span className="text-sm">Sleep</span>
          </div>
          <div className="flex space-x-2">
            <input
              type="number"
              value={entry.sleep?.duration || 0}
              onChange={(e) =>
                handleInputChange('sleep', {
                  ...entry.sleep,
                  duration: parseFloat(e.target.value),
                })
              }
              disabled={isLocked}
              className="w-full px-3 py-2 border rounded-md disabled:bg-gray-50"
              placeholder="Hours"
              step="0.5"
            />
            <select
              value={entry.sleep?.quality || 0}
              onChange={(e) =>
                handleInputChange('sleep', {
                  ...entry.sleep,
                  quality: parseInt(e.target.value),
                })
              }
              disabled={isLocked}
              className="px-3 py-2 border rounded-md disabled:bg-gray-50"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Utensils className="w-4 h-4 mr-2" />
            <span className="text-sm">Macros</span>
          </div>
          <input
            type="number"
            value={entry.macros?.compliance || 0}
            onChange={(e) =>
              handleInputChange('macros', {
                ...entry.macros,
                compliance: parseInt(e.target.value),
              })
            }
            disabled={isLocked}
            className="w-full px-3 py-2 border rounded-md disabled:bg-gray-50"
            placeholder="Compliance %"
            min="0"
            max="100"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Heart className="w-4 h-4 mr-2" />
          <span className="text-sm">Health Metrics</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Digestion (1-10)</label>
            <input
              type="number"
              value={entry.health?.digestion || 0}
              onChange={(e) =>
                handleInputChange('health', {
                  ...entry.health,
                  digestion: parseInt(e.target.value),
                })
              }
              disabled={isLocked}
              className="w-full px-3 py-2 border rounded-md disabled:bg-gray-50"
              min="1"
              max="10"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Energy (1-10)</label>
            <input
              type="number"
              value={entry.health?.energy || 0}
              onChange={(e) =>
                handleInputChange('health', {
                  ...entry.health,
                  energy: parseInt(e.target.value),
                })
              }
              disabled={isLocked}
              className="w-full px-3 py-2 border rounded-md disabled:bg-gray-50"
              min="1"
              max="10"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Brain className="w-4 h-4 mr-2" />
          <span className="text-sm">Mood (1-10)</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={entry.mood || 5}
          onChange={(e) => handleInputChange('mood', parseInt(e.target.value))}
          disabled={isLocked}
          className="w-full disabled:opacity-50"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>1</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Edit3 className="w-4 h-4 mr-2" />
          <span className="text-sm">Notes</span>
        </div>
        <textarea
          value={entry.notes || ''}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          disabled={isLocked}
          className="w-full px-3 py-2 border rounded-md disabled:bg-gray-50"
          rows={3}
          placeholder="Add notes for the day..."
        />
      </div>
    </div>
  );
};