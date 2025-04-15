import React, { useState } from 'react';
import { Calculator, Scale, Activity } from 'lucide-react';
import { calculateTDEE, calculateProteinTarget, calculateMacroSplit } from '../../../utils/calculations';

export const MacroCalculator = () => {
  const [formData, setFormData] = useState({
    weight: 70,
    height: 175,
    age: 30,
    activityLevel: 'moderate' as const,
    goal: 'maintenance' as const,
  });

  const [results, setResults] = useState<{
    tdee: number;
    protein: number;
    carbs: number;
    fats: number;
  } | null>(null);

  const handleCalculate = () => {
    const tdee = calculateTDEE(
      formData.weight,
      formData.height,
      formData.age,
      formData.activityLevel
    );

    const proteinTarget = calculateProteinTarget(formData.weight, formData.goal);
    const macros = calculateMacroSplit(tdee, proteinTarget, formData.goal);

    setResults({
      tdee,
      ...macros,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'weight' || name === 'height' || name === 'age'
        ? parseFloat(value)
        : value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center mb-6">
          <Calculator className="w-6 h-6 text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold">Macro Calculator</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Activity Level
              </label>
              <select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300"
              >
                <option value="sedentary">Sedentary (Little/no exercise)</option>
                <option value="light">Light (1-3 days/week)</option>
                <option value="moderate">Moderate (3-5 days/week)</option>
                <option value="very">Very Active (6-7 days/week)</option>
                <option value="extra">Extra Active (Physical job + training)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Goal
              </label>
              <select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300"
              >
                <option value="cutting">Fat Loss</option>
                <option value="maintenance">Maintenance</option>
                <option value="bulking">Muscle Gain</option>
              </select>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-4"
            >
              Calculate Macros
            </button>
          </div>
        </div>

        {results && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Activity className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="font-medium text-gray-900">TDEE</h3>
              </div>
              <p className="text-2xl font-bold text-blue-600">{results.tdee} kcal</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Scale className="w-5 h-5 text-green-500 mr-2" />
                <h3 className="font-medium text-gray-900">Protein</h3>
              </div>
              <p className="text-2xl font-bold text-green-600">{results.protein}g</p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Carbs</h3>
              <p className="text-2xl font-bold text-yellow-600">{results.carbs}g</p>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Fats</h3>
              <p className="text-2xl font-bold text-red-600">{results.fats}g</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MacroCalculator;