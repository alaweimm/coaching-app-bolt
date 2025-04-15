import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HealthDashboard } from './components/HealthDashboard';

const Health = () => {
  return (
    <Routes>
      <Route index element={<HealthDashboard />} />
    </Routes>
  );
};

export default Health;