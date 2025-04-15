import React from 'react';
import { Heart, Activity, Thermometer } from 'lucide-react';

const VitalsTracking = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Heart className="w-5 h-5 text-red-500 mr-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Heart Rate</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">72 BPM</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Activity className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Blood Pressure</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">120/80</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Thermometer className="w-5 h-5 text-green-500 mr-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Temperature</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">98.6°F</p>
        </div>
      </div>
    </div>
  );
};

export default VitalsTracking;