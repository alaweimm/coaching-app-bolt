import React from 'react';
import { useParams } from 'react-router-dom';
import { Clock, BarChart, Dumbbell } from 'lucide-react';

const WorkoutDetail = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Workout Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-blue-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
              <p className="font-medium text-gray-900 dark:text-white">60 minutes</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <BarChart className="w-5 h-5 text-blue-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Difficulty</p>
              <p className="font-medium text-gray-900 dark:text-white">Intermediate</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Dumbbell className="w-5 h-5 text-blue-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Equipment</p>
              <p className="font-medium text-gray-900 dark:text-white">Full Gym</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Exercises</h3>
          {/* Sample exercises */}
          {['Bench Press', 'Incline Dumbbell Press', 'Tricep Extensions'].map((exercise, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-900 dark:text-white">{exercise}</h4>
                <span className="text-gray-600 dark:text-gray-300">3 x 12</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetail;