import React from 'react';
import { Camera } from 'lucide-react';

const PhotoProgress = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Photo Progress</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <Camera className="w-4 h-4 mr-2" />
          Add Photo
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <p className="text-gray-600 dark:text-gray-300">Track your progress with photos</p>
      </div>
    </div>
  );
};

export default PhotoProgress;