import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProgressDashboard from './components/ProgressDashboard';
import PhotoProgress from './components/PhotoProgress';
import MeasurementHistory from './components/MeasurementHistory';
import { WeightChart } from './components/WeightChart';

const Progress = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Progress Tracking</h1>
      
      <Routes>
        <Route index element={<ProgressDashboard />} />
        <Route path="photos" element={<PhotoProgress />} />
        <Route path="measurements" element={<MeasurementHistory />} />
        <Route path="weight" element={<WeightChart />} />
      </Routes>
    </div>
  );
};

export default Progress;