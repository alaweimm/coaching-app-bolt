import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Scale, CheckSquare, Utensils } from 'lucide-react';
import { useTrackingStore } from '../../../store/trackingStore';
import { WeightTrendChart } from './WeightTrendChart';
import { ComplianceOverview } from './ComplianceOverview';
import { MacroBreakdown } from './MacroBreakdown';
import { calculateComplianceRate } from '../../../utils/calculations';

export const AnalyticsDashboard = () => {
  const { dailyLogs, weeklySummaries } = useTrackingStore();

  // Calculate overall compliance
  const recentLogs = Object.values(dailyLogs)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7);

  const overallCompliance = {
    training: calculateComplianceRate(
      recentLogs.filter(log => log.training.completed).length,
      recentLogs.length
    ),
    nutrition: recentLogs.reduce((sum, log) => sum + log.macros.compliance, 0) / recentLogs.length,
    cardio: calculateComplianceRate(
      recentLogs.filter(log => log.cardio.duration >= 30).length,
      recentLogs.length
    ),
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/analytics/weight"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Scale className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Weight Analysis</h3>
          </div>
          <p className="text-gray-600">Track weight trends and progress</p>
        </Link>

        <Link
          to="/analytics/compliance"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <CheckSquare className="w-5 h-5 text-green-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Compliance Report</h3>
          </div>
          <p className="text-gray-600">Program adherence analysis</p>
        </Link>

        <Link
          to="/analytics/macros"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center mb-4">
            <Utensils className="w-5 h-5 text-purple-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Macro Analysis</h3>
          </div>
          <p className="text-gray-600">Nutrition target achievement</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeightTrendChart />
        <ComplianceOverview compliance={overallCompliance} />
      </div>

      <MacroBreakdown logs={recentLogs} />
    </div>
  );
};