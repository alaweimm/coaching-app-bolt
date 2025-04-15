import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CheckSquare, AlertTriangle } from 'lucide-react';
import { useTrackingStore } from '../../../store/trackingStore';
import { calculateComplianceRate } from '../../../utils/calculations';

export const ComplianceReport = () => {
  const { weeklySummaries } = useTrackingStore();

  const summaries = Object.values(weeklySummaries)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(-12);

  const chartData = summaries.map(summary => ({
    week: `Week ${new Date(summary.startDate).getDate()}`,
    training: summary.compliance.training,
    nutrition: summary.compliance.nutrition,
    cardio: summary.compliance.cardio,
    overall: summary.compliance.overall,
  }));

  const averageCompliance = {
    training: calculateComplianceRate(
      summaries.reduce((sum, s) => sum + s.compliance.training, 0),
      summaries.length * 100
    ),
    nutrition: calculateComplianceRate(
      summaries.reduce((sum, s) => sum + s.compliance.nutrition, 0),
      summaries.length * 100
    ),
    cardio: calculateComplianceRate(
      summaries.reduce((sum, s) => sum + s.compliance.cardio, 0),
      summaries.length * 100
    ),
    overall: calculateComplianceRate(
      summaries.reduce((sum, s) => sum + s.compliance.overall, 0),
      summaries.length * 100
    ),
  };

  const complianceIssues = Object.entries(averageCompliance)
    .filter(([_, rate]) => rate < 80)
    .map(([metric]) => metric);

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <CheckSquare className="w-6 h-6 text-green-500 mr-2" />
        <h2 className="text-xl font-semibold">Compliance Report</h2>
      </div>

      {complianceIssues.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 mr-2" />
            <div>
              <h3 className="font-medium text-yellow-800">Attention Needed</h3>
              <p className="text-yellow-700 text-sm mt-1">
                Low compliance detected in: {complianceIssues.join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.entries(averageCompliance).map(([metric, rate]) => (
          <div key={metric} className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-sm text-gray-500 capitalize">{metric} Compliance</h3>
            <p className="text-2xl font-bold mt-1">{rate}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className={`h-2 rounded-full ${
                  rate >= 90 ? 'bg-green-500' :
                  rate >= 80 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${rate}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-6">Weekly Compliance Trends</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="training" name="Training" fill="#3B82F6" />
              <Bar dataKey="nutrition" name="Nutrition" fill="#10B981" />
              <Bar dataKey="cardio" name="Cardio" fill="#8B5CF6" />
              <Bar dataKey="overall" name="Overall" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};