import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Calendar, Dumbbell, Clock } from 'lucide-react';

const WorkoutList = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Workout Plans</h2>
        <div className="flex space-x-4">
          <Link
            to="/workouts/planner"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Workout
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample workout cards */}
        {['Push Day', 'Pull Day', 'Leg Day'].map((workout, index) => (
          <Link
            key={index}
            to={`/workouts/detail/${index}`}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <Dumbbell className="w-5 h-5 text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{workout}</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4 mr-2" />
                <span>60 minutes</span>
              </div>
              
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4 mr-2" />
                <span>3 times per week</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WorkoutList;