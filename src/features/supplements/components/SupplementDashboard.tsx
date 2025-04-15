import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Filter, AlertTriangle } from 'lucide-react';
import { useTrackingStore } from '../../../store/trackingStore';
import { SupplementList } from './SupplementList';
import { SupplementStats } from './SupplementStats';
import type { Supplement } from '../../../types/tracking';

export const SupplementDashboard = () => {
  const { supplements } = useTrackingStore();
  const [filter, setFilter] = useState<Supplement['phase']>();
  const [categoryFilter, setCategoryFilter] = useState<Supplement['category']>();

  const filteredSupplements = supplements.filter(supp => 
    (!filter || supp.phase === filter) &&
    (!categoryFilter || supp.category === categoryFilter)
  );

  const activeCompounds = supplements.filter(s => 
    s.status === 'active' && s.category === 'compound'
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <select
            value={filter || ''}
            onChange={(e) => setFilter(e.target.value as Supplement['phase'] || undefined)}
            className="rounded-lg border-gray-300 text-sm"
          >
            <option value="">All Phases</option>
            <option value="blast">Blast</option>
            <option value="cruise">Cruise</option>
            <option value="trt">TRT</option>
            <option value="off">Off</option>
          </select>
          
          <select
            value={categoryFilter || ''}
            onChange={(e) => setCategoryFilter(e.target.value as Supplement['category'] || undefined)}
            className="rounded-lg border-gray-300 text-sm"
          >
            <option value="">All Categories</option>
            <option value="compound">Compounds</option>
            <option value="ancillary">Ancillaries</option>
            <option value="supplement">Supplements</option>
          </select>
        </div>

        <Link
          to="/supplements/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Supplement
        </Link>
      </div>

      {activeCompounds > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-800">Active Compounds</h3>
            <p className="text-yellow-700 text-sm mt-1">
              You currently have {activeCompounds} active compound{activeCompounds > 1 ? 's' : ''}.
              Please ensure you're following proper protocols and safety measures.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <SupplementStats supplements={supplements} />
        <div className="lg:col-span-3">
          <SupplementList supplements={filteredSupplements} />
        </div>
      </div>
    </div>
  );
};