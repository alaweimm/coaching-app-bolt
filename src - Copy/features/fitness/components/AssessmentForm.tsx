import React, { useState } from 'react';
import { Save } from 'lucide-react';
import type { SelfAssessment } from '../types/assessment';

const initialAssessment: SelfAssessment = {
  weight: 0,
  height: 0,
  bodyFatPercentage: 0,
  fitnessLevel: 'beginner',
  experienceYears: 0,
  primaryGoal: 'muscle_gain',
  secondaryGoals: [],
  medicalConditions: [],
  injuries: [],
  medications: [],
  weeklyAvailability: 0,
  equipmentAccess: {
    gym: false,
    homeEquipment: [],
    preferredLocation: 'gym',
  },
  preferredTrainingDays: [],
  maxSessionDuration: 60,
  cardioPreference: 'moderate',
};

interface AssessmentFormProps {
  onSubmit: (assessment: SelfAssessment) => void;
}

export const AssessmentForm: React.FC<AssessmentFormProps> = ({ onSubmit }) => {
  const [assessment, setAssessment] = useState<SelfAssessment>(initialAssessment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(assessment);
  };

  const handleChange = (field: keyof SelfAssessment, value: any) => {
    setAssessment(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Physical Assessment</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              step="0.1"
              value={assessment.weight}
              onChange={(e) => handleChange('weight', parseFloat(e.target.value))}
              className="w-full rounded-lg border-gray-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              value={assessment.height}
              onChange={(e) => handleChange('height', parseInt(e.target.value))}
              className="w-full rounded-lg border-gray-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Body Fat %
            </label>
            <input
              type="number"
              step="0.1"
              value={assessment.bodyFatPercentage}
              onChange={(e) => handleChange('bodyFatPercentage', parseFloat(e.target.value))}
              className="w-full rounded-lg border-gray-300"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Experience & Goals</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fitness Level
            </label>
            <select
              value={assessment.fitnessLevel}
              onChange={(e) => handleChange('fitnessLevel', e.target.value)}
              className="w-full rounded-lg border-gray-300"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Years of Experience
            </label>
            <input
              type="number"
              value={assessment.experienceYears}
              onChange={(e) => handleChange('experienceYears', parseInt(e.target.value))}
              className="w-full rounded-lg border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Primary Goal
            </label>
            <select
              value={assessment.primaryGoal}
              onChange={(e) => handleChange('primaryGoal', e.target.value)}
              className="w-full rounded-lg border-gray-300"
            >
              <option value="muscle_gain">Muscle Gain</option>
              <option value="fat_loss">Fat Loss</option>
              <option value="strength">Strength</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Availability & Equipment</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weekly Hours Available
            </label>
            <input
              type="number"
              value={assessment.weeklyAvailability}
              onChange={(e) => handleChange('weeklyAvailability', parseInt(e.target.value))}
              className="w-full rounded-lg border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Location
            </label>
            <select
              value={assessment.equipmentAccess.preferredLocation}
              onChange={(e) => handleChange('equipmentAccess', {
                ...assessment.equipmentAccess,
                preferredLocation: e.target.value
              })}
              className="w-full rounded-lg border-gray-300"
            >
              <option value="gym">Commercial Gym</option>
              <option value="home">Home Gym</option>
              <option value="hybrid">Hybrid (Both)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Session Duration (minutes)
            </label>
            <input
              type="number"
              step="15"
              value={assessment.maxSessionDuration}
              onChange={(e) => handleChange('maxSessionDuration', parseInt(e.target.value))}
              className="w-full rounded-lg border-gray-300"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Assessment
        </button>
      </div>
    </form>
  );
};