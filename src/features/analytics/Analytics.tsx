import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { WeightAnalysis } from './components/WeightAnalysis';
import { ComplianceReport } from './components/ComplianceReport';
import { MacroAnalysis } from './components/MacroAnalysis';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
      
      <Routes>
        <Route index element={<AnalyticsDashboard />} />
        <Route path="weight" element={<WeightAnalysis />} />
        <Route path="compliance" element={<ComplianceReport />} />
        <Route path="macros" element={<MacroAnalysis />} />
      </Routes>
    </div>
  );
};

export default Analytics;