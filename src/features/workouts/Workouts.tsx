import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { WorkoutBuilder } from './components/WorkoutBuilder';
import { WorkoutTemplates } from './components/WorkoutTemplates';
import { ProgressTracking } from './components/ProgressTracking';
import { PixelHeading } from '../../components/ui/PixelHeading';

export default function Workouts() {
  return (
    <div className="space-y-6">
      <PixelHeading level={1}>Workout Management</PixelHeading>
      
      <Routes>
        <Route index element={<WorkoutBuilder />} />
        <Route path="templates" element={<WorkoutTemplates />} />
        <Route path="progress" element={<ProgressTracking />} />
      </Routes>
    </div>
  );
}