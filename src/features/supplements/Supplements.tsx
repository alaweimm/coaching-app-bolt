import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SupplementDashboard } from './components/SupplementDashboard';
import { SupplementForm } from './components/SupplementForm';

const Supplements = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Supplement Management</h1>
      
      <Routes>
        <Route index element={<SupplementDashboard />} />
        <Route path="new" element={<SupplementForm />} />
        <Route path="edit/:id" element={<SupplementForm />} />
      </Routes>
    </div>
  );
};

export default Supplements;