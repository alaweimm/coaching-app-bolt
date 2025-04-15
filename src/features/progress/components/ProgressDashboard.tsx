import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Ruler, Scale, TrendingUp } from 'lucide-react';
import { WeightChart } from './WeightChart';
import { MeasurementSummary } from './MeasurementSummary';

const ProgressDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/progress/photos"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Camera className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Progress Photos</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">Visual progress tracking</p>
        </Link>

        <Link
          to="/progress/measurements"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Ruler className="w-5 h-5 text-green-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Measurements</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">Body measurement tracking</p>
        </Link>

        <Link
          to="/progress/weight"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Scale className="w-5 h-5 text-purple-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weight Log</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">Weight tracking history</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeightChart />
        <MeasurementSummary />
      </div>
    </div>
  );
};

export default ProgressDashboard;