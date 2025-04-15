import React from 'react';
import { Pill, Shield, Leaf, Clock } from 'lucide-react';
import type { Supplement } from '../../../types/tracking';

interface SupplementStatsProps {
  supplements: Supplement[];
}

export const SupplementStats: React.FC<SupplementStatsProps> = ({ supplements }) => {
  const stats = {
    compounds: supplements.filter(s => s.category === 'compound').length,
    ancillaries: supplements.filter(s => s.category === 'ancillary').length,
    supplements: supplements.filter(s => s.category === 'supplement').length,
    active: supplements.filter(s => s.status === 'active').length,
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex items-center">
          <div className="p-2 bg-red-100 rounded-lg">
            <Pill className="w-5 h-5 text-red-600" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-500">Compounds</p>
            <p className="text-lg font-semibold">{stats.compounds}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Shield className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-500">Ancillaries</p>
            <p className="text-lg font-semibold">{stats.ancillaries}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <Leaf className="w-5 h-5 text-green-600" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-500">Supplements</p>
            <p className="text-lg font-semibold">{stats.supplements}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-lg font-semibold">{stats.active}</p>
          </div>
        </div>
      </div>
    </div>
  );
};